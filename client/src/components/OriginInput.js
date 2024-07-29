import React, { useState, useEffect, useRef } from "react";
import Car from "./Car";
import { moveCar } from "../utils/moveCars";
import "./OriginInput.css";
import "./WelcomeText.css";
import AutocompleteInput from "./AutocompleteInput";

const OriginInput = ({ onSubmit }) => {
  const [cars, setCars] = useState([]);
  const [origin, setOrigin] = useState("");
  const [stops, setStops] = useState([""]);
  const [destination, setDestination] = useState("");
  const sectionRef = useRef(null);
  const [isSecondColumnVisible, setSecondColumnVisible] = useState(false);

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

  // Intersection Observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Element in view:", entry.target);
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, 300); // 0.3 second delay
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll(".input-section");
    elements.forEach((element) => {
      console.log("Observing element:", element);
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    if (stops.length > 6) {
      setSecondColumnVisible(true);
    } else {
      setSecondColumnVisible(false);
    }
  }, [stops.length]);

  const scrollToSection = () => {
    const element = document.getElementById("section-results");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Scrolls to the section smoothly
    }
  };

  const handleStopClick = (index) => {
    if (index === stops.length - 1 && stops.length < 12) {
      setStops([...stops, ""]);
    }
  };

  const handleStopChange = (index, value) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const handleSubmit = () => {
    const addresses = [
      origin,
      ...stops.filter((stop) => stop !== ""),
      destination,
    ];
    onSubmit(addresses);
    scrollToSection();
  };

  return (
    <div className="animated-background">
      <div className="input-sections poppins-thin" ref={sectionRef}>
        <div className="input-section">
          <h1>origin</h1>
          <AutocompleteInput value={origin} onChange={setOrigin} />
        </div>
        <div className="input-section">
          <h1>stops</h1>
          <div className="stops-container">
            <div className="column">
              {stops.slice(0, 6).map((stop, index) => (
                <input
                  key={index}
                  type="text"
                  //placeholder={`Enter stop ${index + 1}`}
                  value={stop}
                  onChange={(e) => handleStopChange(index, e.target.value)}
                  onClick={() => handleStopClick(index)}
                />
              ))}
            </div>
            <div
              className={`column ${
                isSecondColumnVisible ? "visible" : "hidden"
              }`}
            >
              {stops.slice(6, 12).map((stop, index) => (
                <input
                  key={index + 6}
                  type="text"
                  //placeholder={`Enter stop ${index + 7}`}
                  value={stop}
                  onChange={(e) => handleStopChange(index + 6, e.target.value)}
                  onClick={() => handleStopClick(index + 6)}
                />
              ))}
            </div>
          </div>
          {stops.length >= 12 && <p>Max limit of stops is 12</p>}
        </div>
        <div className="input-section">
          <h1>target</h1>
          <AutocompleteInput value={destination} onChange={setDestination} />
        </div>
      </div>
      {cars.map((car) => (
        <Car key={car.id} position={car.position} direction={car.direction} />
      ))}
      <div className="scroll-indicator" onClick={handleSubmit}>
        ↓
      </div>
    </div>
  );
};

export default OriginInput;
