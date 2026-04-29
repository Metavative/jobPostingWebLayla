"use client";

import { useState } from "react";

export default function ToastDemo() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 2200);
  };

  return (
    <>
      <button type="button" className="job_save_btn" onClick={handleClick}>
        Save Job
      </button>

      {show && (
        <div className="toast_box">
          <div className="toast_dot"></div>
          <span>Job saved successfully</span>
        </div>
      )}
    </>
  );
}