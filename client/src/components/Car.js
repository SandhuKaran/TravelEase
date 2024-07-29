import React from "react";
import "./Car.css";

const Car = ({ position, direction }) => {
  const style = {
    top: position.y,
    left: position.x,
    transform: direction === "vertical" ? "rotate(90deg)" : "none", // Rotate car if direction is vertical
  };

  return (
    <div className="car" style={style}>
      <div className="car-body">
        <div className="car-headlight car-headlight-left"></div>
        <div className="car-headlight car-headlight-right"></div>
        <div className="car-windshield-rear"></div>
        <div className="car-windshield-front"></div>
      </div>
    </div>
  );
};

export default Car;
