import React from "react"; 
import '/src/styles/Loader.css'

export default function Loader() {
    return (
        <div className="loader-con">
          <div className="spinner"></div>
          <p>Loading tasks, please wait...</p>
        </div>
      );
    };
