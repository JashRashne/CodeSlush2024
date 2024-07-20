const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bodyparser = require("body-parser");
const { google } = require("googleapis");
const request = require("request");
const axios = require("axios");
const urlParse = require("url-parse");
const upload = require("./middlewares/multer.middlewares");
const cron = require("node-cron");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const twilio = require("twilio");
const User = require("./models/user.models");
const verifyJWT = require("./middlewares/auth.middlewares");
const getUserModel = require("./utils/getUserModel");
const { uploadOnCloudinary } = require("./utils/cloudinary");
const Student = require("./models/student.models");
const Leave = require("./models/leave.models");
const Warden = require("./models/warden.models");
const Teacher = require("./models/teacher.models");
const Entry = require("./models/entry.models");
const moment = require("moment");
const nodemailer = require("nodemailer");

app.use(cookieParser()); // for CRUD operations on cookies
// app.use("/files", express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const now = new Date();
const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
const sevenDaysAgoMillis = sevenDaysAgo.getTime();

const mongo_uri = process.env.MONGO_URI;
mongoose
  .connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

//Twilio
const Patient = require("./models/patient.models");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// const studentRouter = require("./routes/student.routes");

//because declaring route in other file, use middleware
// app.use("/api/v1/students", studentRouter);

const fieldRequirements = {
  student: ["email", "fullName", "password", "wardNo", "roomNo", "mobNo"],
  warden: ["email", "fullName", "password", "ward"],
  teacher: ["email", "fullName", "password"],
  security: ["email", "fullName", "password"],
};

const generateAccessAndRefreshTokens = async (userId, role) => {
  const UserModel = getUserModel(role);

  const user = await UserModel.findById(userId);
  // console.log(user);
  try {
    const accessToken = user.generateAccessToken();
    // console.log(accessToken);
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error in generating access token");
  }
};
app.get("/", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).send("Email is missing.");
  try {
    const student = await User.findOne({ email });
    if (!student) return res.status(400).send("User does not exist.");
    res.status(200).send(student.email);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/register", async (req, res) => {
  const { email, fullName, password, role, ...additionalFields } = req.body;
  try {
    // Check if userType is valid
    if (!fieldRequirements[role]) {
      return res.status(400).send("Invalid user type");
    }

    // Ensure required fields are present
    const requiredFields = fieldRequirements[role];
    if (
      requiredFields.some(
        (field) => !req.body[field] || req.body[field]?.trim() === ""
      )
    ) {
      return res
        .status(400)
        .send(`All fields are required: role, ${requiredFields.join(", ")}`);
    }
    const UserModel = getUserModel(role);
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User with email already exists");
    }

    // const hashedPassword = await bcrypt.hash(password);

    const user = await UserModel.create({
      email,
      fullName,
      password,
      role,
      ...additionalFields,
    });
    // console.log(additionalFields);
    const createdUser = await UserModel.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res
        .status(500)
        .send("Something went wrong while registering the user");
    }

    return res.status(201).json({
      user: createdUser,
      message: "User registered successfully!",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send("Email, password and role are required");
  }
  const UserModel = getUserModel(role);

  const user = await UserModel.findOne({ email });

  // console.log(user);
  // console.log("hi");
  if (!user) {
    return res.status(404).send("User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  // console.log(isPasswordValid);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid User Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
    role
  );

  const loggedInUser = await UserModel.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: loggedInUser,
      accessToken,
      refreshToken,
      message: "User logged in successfully",
    });
});
app.post("/logout", verifyJWT, async (req, res) => {
  // console.log(req.user, "   LOGOUT");
  // const { role } = req.body;
  const UserModel = getUserModel(req.user.role);
  await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $: { refreshToken: undefined },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "User logged out successfully",
    });
});
app.post("/apply-leave", verifyJWT, upload.single("file"), async (req, res) => {
  const { reason, startDateStr, endDateStr } = req.body;

  // console.log("Reason:", reason);
  // console.log("Start Date:", startDateStr);
  // console.log("End Date:", endDateStr);
  // console.log("File:", req.file);
  if (
    [reason, startDateStr, endDateStr].some((field) => {
      return !field || field.trim() === "";
    })
  ) {
    return res.status(400).send("Some fields are missing");
  }
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  try {
    // Validate fields

    // Upload the file to Cloudinary
    const letterLocalPath = req.file.path;
    if (!letterLocalPath) {
      return res.status(400).send("Letter is required");
    }

    const letter = await uploadOnCloudinary(letterLocalPath);
    if (!letter) {
      return res.status(400).send("Error while uploading file on Cloudinary");
    }
    // console.log(reason, startDate, endDate, letter.url);
    // Create a new Leave document
    const studentId = req.user._id; // Get the logged-in user's ID
    const newLeave = await Leave.create({
      reason,
      startDate,
      endDate,
      letterURL: letter.url,
      student: studentId, //  the student reference
    });

    // Save the Leave document
    const savedLeave = await newLeave.save();

    // Add the Leave ObjectId to the Student's leaves array
    await Student.findByIdAndUpdate(studentId, {
      $push: { leaves: savedLeave._id },
    });

    res.status(200).send("Leave applied successfully.");
  } catch (error) {
    console.error("Error applying leave:", error);
    res.status(500).send("Server error.");
  }
});

app.get("/fetch-leaves", verifyJWT, async (req, res) => {
  try {
    const leaves = await Leave.find().populate("student").exec();
    // console.log(leaves);
    return res.status(200).json(leaves);
  } catch (error) {
    return res
      .send(500)
      .json({ message: "Failed to fetch all the leave requests" });
  }
});

app.get("/getURLTing", (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:8000/steps"
  );

  const scopes = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.heart_rate.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
    "https://www.googleapis.com/auth/fitness.sleep.write",
    "https://www.googleapis.com/auth/fitness.activity.write",
    "https://www.googleapis.com/auth/fitness.location.read",
    "profile",
    "email",
    "openid",
  ];

  const url = oauth2Client.generateAuthUrl({
    accessType: "offline",
    scope: scopes,
    state: JSON.stringify({
      callbackUrl: req.body.callbackUrl,
      userID: req.body.userid,
    }),
  });

  request(url, (err, response, body) => {
    console.log("error: ", err);
    console.log("StatusCode: ", response && response.statusCode);
    res.send({ url });
  });
});

let summaryArray = [];
let stepsArrayNew = [];
let workoutArray = [];
let heartRateArray = [];
let fitData;

app.get("/steps", async (req, res) => {
  const queryURL = new urlParse(req.url);
  const queryString = await import("query-string");
  const code = queryString.default.parse(queryURL.query).code;
  console.log("Authorization code: ", code);

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:8000/steps"
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const result = await axios.post(
      "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      {
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
            dataSourceId:
              "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
          },
          {
            dataTypeName: "com.google.activity.segment",
            dataSourceId:
              "derived:com.google.activity.segment:com.google.android.gms:merge_activity_segments",
          },
          {
            dataTypeName: "com.google.heart_rate.bpm",
            dataSourceId:
              "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm",
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: sevenDaysAgoMillis,
        endTimeMillis: now.getTime(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    summaryArray = result.data.bucket;
    // res.send(summaryArray)
    for (const dataSet of summaryArray) {
      for (const points of dataSet.dataset) {
        for (const values of points.point) {
          if (values.dataTypeName === "com.google.step_count.delta") {
            stepsArrayNew.push(values);
          } else if (values.dataTypeName === "com.google.activity.summary") {
            workoutArray.push(values);
          } else if (values.dataTypeName === "com.google.heart_rate.summary") {
            heartRateArray.push(values);
          }
        }
      }
    }
    fitData = {
      steps: stepsArrayNew,
      workout: workoutArray,
      heartRate: heartRateArray,
    };
    res.send(fitData);
  } catch (error) {
    console.error(
      "Error during API request: ",
      error.response ? error.response.data : error.message
    );
    if (!res.headersSent) {
      res
        .status(500)
        .send(error.response ? error.response.data : error.message);
    }
  }
});
app.post("/send-alerts", async (req, res) => {
  const { disease, phone } = req.body;

  // const { disease, studentId} = req.body

  try {
    // const student = await Student.findById(studentId);
    // const message = `A resident in Ward ${student.wardNo} Room ${student.roomNo} has tested positive for ${disease}. Please practice social distancing and wear masks in common areas.`;
    const message = `Stay away from this student. He has ${disease}`;
    // const students = await Student.find({});
    // const promises = students.map(stu => {
    //   return client.messages.create({
    //     from: process.env.TWILIO_PHONE_NUMBER,
    //     to: `whatsapp:+${stu.mobNo}`,
    //     body: message,
    //   });
    // });
    const msg = await client.messages.create({
      from: "+12513158876", // Your Twilio WhatsApp-enabled number
      to: "+918369406489",
      body: message,
    });
    res.status(200).json({ message: "Message sent successfully!", msg });

    // await Promise.all(promises);
    // res.status(200).json({ message: 'Alerts sent successfully to all students!' });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send alerts", error: error.message });
  }
});

// Function to export entries to Excel
async function exportEntriesToExcel() {
  try {
    const entries = await Entry.find().populate("student");

    if (entries.length === 0) {
      console.log("No entries to export.");
      return;
    }

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Entries");
    worksheet.columns = [
      { header: "Student Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Ward", key: "ward", width: 10 },
      { header: "Room No.", key: "roomNo", width: 10 },
      { header: "Mobile No.", key: "mobNo", width: 15 },
      { header: "Check-In Time", key: "checkInTime", width: 25 },
    ];

    entries.forEach((entry) => {
      worksheet.addRow({
        name: entry.student.fullName,
        email: entry.student.email,
        ward: entry.student.wardNo,
        roomNo: entry.student.roomNo,
        mobNo: entry.student.mobNo,
        checkInTime: new Date(entry.checkInTime).toLocaleString(),
      });
    });

    const directoryPath = path.join(__dirname, "public/temp");
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const filePath = path.join(directoryPath, "checkInEntry.xlsx");
    await workbook.xlsx.writeFile(filePath);
    console.log("Entries exported to Excel successfully.");

    // Optionally, clear the entries from the database
    // await Entry.deleteMany({});
    console.log("Entries cleared from the database.");
  } catch (error) {
    console.error("Error exporting entries to Excel:", error);
  }
}

app.get("/download-entries", async (req, res) => {
  await exportEntriesToExcel();

  const filePath = path.join(__dirname, "public/temp", "checkInEntry.xlsx");
  res.download(filePath, "checkInEntry.xlsx", (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

// Schedule the task to run every 7 days
// cron.schedule('0 0 * * 0', exportEntriesToExcel); // Runs every Sunday at midnight

// Run the function immediately
// exportEntriesToExcel();

app.post("/hostel-entry", verifyJWT, async (req, res) => {
  const { studentEmail } = req.body;
  if (!studentEmail) {
    return res.status(400).send("Student email is required");
  }
  try {
    const student = await Student.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).send("Student not found");
    }
    const currentTime = new Date();
    if (currentTime.getHours() >= 0) {
      // console.log("HEY");

      const message = `Late Entry: \nName : ${student.fullName}\nWard : ${student.wardNo}\nRoom No. : ${student.roomNo}\nMobile No. : ${student.mobNo}`;

      const msg = await client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: "+919082176297",
        body: message,
      });
      console.log("Message sent successfully! ", message);
      // return res.status(200).json({ message: "Message sent successfully!\n" });
    }
    const entryTime = currentTime.getTime();

    const newEntry = await Entry.create({
      checkInTime: entryTime,
      student: student._id,
    });

    await newEntry.save();
    return res.status(201).send(newEntry);
  } catch (error) {
    return res.status(500).json({ message: "Failed to make new entry", error });
  }
});
app.get("/get-entries", verifyJWT, async (req, res) => {
  try {
    const entries = await Entry.find().populate("student").exec();
    return res
      .status(200)
      .json({ message: "Entries fetched successfully", entries });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching entries", error });
  }
});

//Medicine Tracker
function getDueMedications(student) {
  let dueMedications = [];
  const currentTime = moment(); // Current time

  student.medication?.forEach((med) => {
    const endDate = moment(med.startDate).add(med.days, "days");
    if (currentTime.isBetween(med.startDate, endDate, "day", "[]")) {
      const dosageArray = med.dosage.split("-").map(Number); // Convert "1-0-1" to [1, 0, 1]
      if (!med.times || med.times.length < dosageArray.length) {
        console.error("Invalid or insufficient times data in medication:", med);
        return;
      }
      console.log(dosageArray);
      dosageArray.map((doseCount, index) => {
        if (doseCount) {
          const time = med.times[index];
          const [hour, minute] = time.split(":").map(Number);
          const doseTime = moment().hour(hour).minute(minute).second(0);

          if (currentTime.isSame(doseTime, "minute")) {
            dueMedications.push({
              medName: med.medName,
              time: doseTime.format("HH:mm"),
              dose: doseCount,
            });
          }
        }
      });
    }
  });
  return dueMedications;
}

// Iterate over each dosage time
// dosageArray.forEach((doseCount, index) => {
//   if (doseCount > 0) {
//     // Validate time format
//     const time = med.times[index];
//     if (!time || !time.includes(":")) {
//       console.error("Invalid time format in medication:", med);
//       return;
//     }

//     const [hour, minute] = time.split(":").map(Number);
//     const doseTime = moment().hour(hour).minute(minute).second(0);

//     // Check if current time matches the dose time
//     if (currentTime.isSame(doseTime, "minute")) {
//       if (!dueMedications[med.medicationName]) {
//         dueMedications[med.medicationName] = [];
//       }
//       dueMedications[med.medicationName].push({
//         time: doseTime.format("HH:mm"),
//         dose: doseCount,
//       });
//     }
// }
// });
// }
// });

// }

async function sendNotification(student, dueMedications) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let medList = dueMedications
    .map((med) => `${med.medName} ${student.email} (Dose: ${med.dose})`)
    .join("\n");

  let mailOptions = {
    from: "55.juhideore@gmail.com",
    to: "test.juhid30@gmail.com",
    subject: "HCube - Medication Reminder",
    text: `Hello ${student.fullName},\n\nIt's time to take your medications:\n${medList}\n\nStay healthy!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification sent to:", student.email);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

cron.schedule("* * * * *", async () => {
  try {
    const students = await Student.find({});

    students.forEach((student) => {
      const dueMedications = getDueMedications(student);
      console.log(dueMedications);
      dueMedications.map((medicine) => {
        console.log(medicine.medName, "juhi", medicine.time);
      });
      if (Array.isArray(dueMedications) && dueMedications.length > 0) {
        sendNotification(student, dueMedications);
      }
    });
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
});

app.post("/set-medication", async (req, res) => {
  const { medName, dosage, startDate, days, times } = req.body;
  if (
    [medName, dosage, startDate, days].some((field) => {
      return !field || field.trim === "";
    })
  ) {
    return res.status(400).json({ message: "Essential fields are missing" });
  }
  const medication = {
    medName,
    dosage,
    startDate: new Date(startDate),
    days,
    times,
  };
  console.log(medication);
  try {
    const student = await Student.findByIdAndUpdate(
      // req.user._id,
      "669bad56801255e31e6a9d0b",
      { $push: { medication } },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res
      .status(200)
      .json({ message: "Medication updated successfully", student });
  } catch (error) {
    console.error("Error updating medication:", error);
    res.status(500).json({ message: "Error while updating medication", error });
  }
});

// Endpoint to share patient info from warden to teacher
app.post("/share-patient-info", verifyJWT, async (req, res) => {
  const {
    teacherEmail,
    patientEmail,
    patientFullName,
    dateOfAdmission,
    dateOfDischarge,
    reason,
  } = req.body;

  try {
    console.log(req.user);

    const teacher = await Teacher.findOne({ email: teacherEmail });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const patient = await Student.findOne({ email: patientEmail });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const message = `Patient Info:
    Name: ${patientFullName}
    Email: ${patientEmail}
    Date of Admission: ${dateOfAdmission}
    Date of Discharge: ${dateOfDischarge || "N/A"}
    Reason: ${reason}`;

    const newPatient = await Patient.create({
      fullName: patientFullName,
      email: patientEmail,
      dateOfAdmission,
      dateOfDischarge,
      reason,
    });

    res.status(200).json({
      message: "Patient info shared successfully",
      patientInfo: message,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to share patient info", error });
  }
});

const mockStudents = {
  "55.juhideore@gmail.com": {
    email: "55.juhideore@gmail.com",
    mobNo: "9082176297",
  },
};

// trying to fetch the mobile number
app.get("/api/v1/students/:email/mobile", async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ mobNo: student.mobNo });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student mobile number",
      error: error.message,
    });
  }
});

// to send location alert
app.post("/send-location-alert", async (req, res) => {
  const { email, location } = req.body;

  try {
    // console.log(location);
    // mobile number
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // console.log(student);

    const message = `Student with email ${email} is at location: \n(${location.latitude}, ${location.longitude})`;

    // location alert
    const msg = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+919082176297",
      body: message,
    });

    return res
      .status(200)
      .json({ message: "Location alert sent successfully!", msg });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send location alert", error: error.message });
  }
});

app.post("/test", async (req, res) => {
  try {
    // const stude
    // res.status(201).send(fitData);
  } catch (error) {
    console.log("TEST ERROR" + error);
  }
});

const port = 8000;
app.listen(process.env.PORT || port, () => {
  console.log("Server started at " + port);
});
module.exports = { app };
