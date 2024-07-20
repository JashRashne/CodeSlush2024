import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePersonCount } from "../Store/PersonSlice";
import * as ml5 from "ml5";
import Webcam from "react-webcam";
import Navbar from "./Navbar";

const dimensions = {
  width: 800,
  height: 500,
};

const CamSurveillance = () => {
  const [newCount, setNewCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const finalCount = useSelector((state) => state.person.personCount);
  const webcamRef = useRef();
  const canvasRef = useRef();
  const { width, height } = dimensions;

  const updateCountAPI = async (e) => {
    try {
      console.log(newCount, "HI");
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
      <div className="h-[100vh]">
        <Navbar />
        <div className=" p-5 h-[90%] flex justify-evenly">
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
      </div>
    </>
  );
};

export default CamSurveillance;
