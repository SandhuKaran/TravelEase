// src/utils/moveCars.js
export const moveCar = (car, width, height) => {
  const newPosition = { ...car.position };

  // Move horizontally to the right for horizontal cars
  if (car.direction === "horizontal") {
    newPosition.x += 9; // Move 9 pixels to the right each interval
  }
  // Move vertically downwards for vertical cars
  else if (car.direction === "vertical") {
    newPosition.y += 9; // Move 9 pixels down each interval
  }

  return { ...car, position: newPosition };
};
