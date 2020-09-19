import React from "react";

export default function Separator() {
  return (
    <div className="separator separator-bottom separator-skew zindex-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon className="fill-default" points="2560 0 2560 100 0 100" />
      </svg>
    </div>
  );
}
