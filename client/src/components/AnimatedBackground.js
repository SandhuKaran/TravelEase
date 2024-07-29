import React, { useState, useEffect } from "react";
import Car from "./Car";
import { moveCar } from "../utils/moveCars";
import "./AnimatedBackground.css";
import "./WelcomeText.css"; // Import the new CSS file
import image from "../images/4.png";

const AnimatedBackground = () => {
  const [cars, setCars] = useState([]);

  // Function to generate a random position for a car outside the screen bounds
  const generateInitialPosition = () => {
    const side = Math.floor(Math.random() * 2); // Randomize which side the car will appear from
    let x, y;

    // Determine initial position based on which side the car appears from
    switch (side) {
      case 0: // Top side
        x = Math.random() * window.innerWidth;
        y = -50; // Car appears just above the screen
        break;
      case 1: // Left side
        x = -50; // Car appears just to the left of the screen
        y = Math.random() * window.innerHeight;
        break;
      default:
        break;
    }

    return { x, y };
  };

  // Function to add a new car to the array of cars
  const addCar = () => {
    const newCar = {
      id: Math.random(),
      position: generateInitialPosition(),
      direction: Math.random() < 0.5 ? "horizontal" : "vertical", // Randomly set direction to horizontal or vertical
    };
    setCars((prevCars) => [...prevCars, newCar]);
  };

  // Add a new car at random intervals
  useEffect(() => {
    const interval = setInterval(() => {
      addCar();
    }, Math.random() * 2000 + 1000); // Random interval between 1 and 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Move cars at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCars((prevCars) =>
        prevCars.map((car) =>
          moveCar(car, window.innerWidth, window.innerHeight)
        )
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = () => {
    const element = document.getElementById("section-origin");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Scrolls to the section smoothly
    }
  };

  return (
    <div className="animated-background">
      <div className="welcome-text poppins-thin">
        <h1>Travel</h1>
        <h2>simpler</h2>
        <h3>and easier.</h3>
      </div>
      <div className="description-text poppins-thin">
        <p>Input multiple addresses.</p>
        <p>Get the shortest path.</p>
      </div>
      {cars.map((car) => (
        <Car key={car.id} position={car.position} direction={car.direction} />
      ))}
      <img className="delayed-image" src={image} alt="Description" />
      <div className="scroll-indicator" onClick={scrollToSection}>
        ↓
      </div>
    </div>
  );
};

export default AnimatedBackground;
