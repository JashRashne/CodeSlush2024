import axios from "axios";
import React from "react";

const DownloadEntries = () => {
  const download = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/download-entries",
        {
          responseType: "blob", // This is important for file downloads
        }
      );
      const formattedDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
      const fileName = `Entry_${formattedDate}`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.xlsx`; // Name the file to be downloaded
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up the URL object
      window.URL.revokeObjectURL(url);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={download}>HERE</button>
    </div>
  );
};

export default DownloadEntries;
