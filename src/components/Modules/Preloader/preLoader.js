import React from "react";

const PreLoader = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        borderTopColor: color,
      }}
      class="loader"
    >
    </div>
  );
};

export default PreLoader;
