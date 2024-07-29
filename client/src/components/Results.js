import React, { useState, useEffect } from "react";
import Car from "./Car";
import { moveCar } from "../utils/moveCars";
import "./Results.css";
import Footer from "./Footer";

const Results = ({ addresses }) => {
  const [visibleAddresses, setVisibleAddresses] = useState([]);

  useEffect(() => {
    let delay = 0;
    addresses.forEach((address, index) => {
      setTimeout(() => {
        setVisibleAddresses((prevAddresses) => [...prevAddresses, address]);
      }, delay);
      delay += 200; // 200ms delay between each address
    });
  }, [addresses]);

  const [cars, setCars] = useState([]);

  const generateInitialPosition = () => {
    const side = Math.floor(Math.random() * 2);
    let x, y;
    switch (side) {
      case 0:
        x = Math.random() * window.innerWidth;
        y = -50;
        break;
      case 1:
        x = -50;
        y = Math.random() * window.innerHeight;
        break;
      default:
        break;
    }
    return { x, y };
  };

  const addCar = () => {
    const newCar = {
      id: Math.random(),
      position: generateInitialPosition(),
      direction: Math.random() < 0.5 ? "horizontal" : "vertical",
    };
    setCars((prevCars) => [...prevCars, newCar]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addCar();
    }, Math.random() * 2000 + 1000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="results-background ">
      <div className="results-heading poppins-thin">
        <h1>Shortest Path</h1>
      </div>
      <div className="results-content">
        <ul>
          {visibleAddresses.map((address, index) => (
            <li key={index} className="fade-in">
              {address}
            </li>
          ))}
        </ul>
      </div>
      {cars.map((car) => (
        <Car key={car.id} position={car.position} direction={car.direction} />
      ))}
      <Footer />
    </div>
  );
};

export default Results;
