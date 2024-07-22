import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePersonCount } from "../Store/PersonSlice";
import * as ml5 from "ml5";
import close from "../assets/close.png";
import Webcam from "react-webcam";
import Navbar from "./Navbar";
import axios from "axios";

const dimensions = {
  width: 800,
  height: 500,
};

const CamSurveillance = ({ setSurvCam }) => {
  const [newCount, setNewCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const finalCount = useSelector((state) => state.person.personCount);
  const webcamRef = useRef();
  const canvasRef = useRef();
  const { width, height } = dimensions;

  const updateCountAPI = async (e) => {
    try {
      const request = await axios.post(
        "http://localhost:8000/update-room-occupancy",
        {
          count: newCount,
        }
      );
      const response = request.data;
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    let detectionInterval;

    const modelLoaded = () => {
      webcamRef.current.video.width = width;
      webcamRef.current.video.height = height;
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      detectionInterval = setInterval(() => {
        detect();
      }, 1000);
    };
    const objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    const incrementPersonCount = (newCount) => {
      dispatch(updatePersonCount(newCount));
    };

    const detect = () => {
      if (webcamRef.current.video.readyState !== 4) {
        console.warn("Video not ready yet");
        return;
      }

      objectDetector.detect(webcamRef.current.video, (err, results) => {
        if (err) {
          console.error(err);
          return;
        }

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        setNewCount(0);
        if (results && results.length) {
          results.forEach((detection) => {
            const { label, x, y, width, height } = detection;
            if (label === "person") {
              setNewCount((prevCount) => prevCount + 1);

              ctx.beginPath();
              ctx.fillStyle = "#FF0000";
              ctx.fillText(label, x, y - 5);
              ctx.rect(x, y, width, height);
              ctx.stroke();
            }
          });
        }
        incrementPersonCount(newCount);
      });
    };

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    };
  }, [width, height]);

  useEffect(() => {
    updateCountAPI();
  }, [newCount]);

  return (
    <>
      <div className=" h-[90%] flex justify-evenly">
        {" "}
        <div
          onClick={() => {
            setSurvCam(false);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl w-7 h-7 cursor-pointer flex items-center justify-center"
        >
          <img src={close} alt="close" />
        </div>
        <div className="max-w-[68%] max-h-[100%] relative flex items-center w-[100%]">
          <Webcam ref={webcamRef} className="w-[100%] h-[100%] relative" />
          <canvas
            ref={canvasRef}
            className="w-[100%] h-[100%] absolute top-0 left-0 z-[100]"
          />
        </div>
        <div className=" w-[25%] flex flex-col gap-10 items-center justify-center">
          <h1 className="noto-sans-dashFont text-center text-[44px]">
            Surveillance is ON
          </h1>
          <p className="noto-sans-dashFont text-center text-[24px]">
            Number of Students : {newCount}
          </p>
        </div>
      </div>
    </>
  );
};

export default CamSurveillance;
