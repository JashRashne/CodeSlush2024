import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const LeaveApplication = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("reason", data.reason);
    formData.append("startDateStr", data.startDateStr);
    formData.append("endDateStr", data.endDateStr);
    formData.append("file", data.file[0]); // file input should be handled as an array

    try {
      const response = await axios.post(
        "http://localhost:8000/apply-leave",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response data:", response.data);
    } catch (error) {
      console.error(
        "Error occurred while applying for leave:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <label>Reason</label>
      <textarea name="reason" {...register("reason")} />
      <label>Start Date</label>
      <input type="date" {...register("startDateStr")} />
      <label>End Date</label>
      <input type="date" {...register("endDateStr")} />
      <label>Letter</label>
      <input type="file" name="file" {...register("file")} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LeaveApplication;
