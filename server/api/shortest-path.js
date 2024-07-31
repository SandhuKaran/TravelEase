const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const APIKey = process.env.GOOGLE_MAPS_API_KEY;

app.use(cors());
app.use(express.json());

app.post("/api/shortest-path", async (req, res) => {
  const { origin, destination, stops } = req.body;

  if (!origin || !destination || !Array.isArray(stops) || stops.length === 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const addresses = [origin, ...stops, destination];
  const permutations = permute(addresses);

  let shortestPath = null;
  let shortestTime = Infinity;

  try {
    const or = addresses.slice(0, -1).join("|");
    const de = addresses.slice(1).join("|");

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${or}&destinations=${de}&key=${APIKey}`;

    const response = await axios.get(url);
    const result = response.data;

    //console.log("API Response:", JSON.stringify(result, null, 2)); // Debug log the API response

    // Check if the response contains the required data
    if (!result.rows || result.rows.length === 0) {
      return res.status(500).json({ error: "Invalid API response" });
    }

    for (const route of permutations) {
      let totalTime = 0;

      for (let i = 0; i < route.length - 1; i++) {
        const fromIndex = addresses.indexOf(route[i]);
        const toIndex = addresses.indexOf(route[i + 1]) - 1;

        //console.log(`Calculating time from ${route[i]} to ${route[i + 1]}`); // Debug log each step

        if (
          result.rows[fromIndex] &&
          result.rows[fromIndex].elements[toIndex]
        ) {
          totalTime += result.rows[fromIndex].elements[toIndex].duration.value;
          //console.log("Time:", totalTime); // Debug log the time for each step
        }
      }

      //console.log("Route:", route, "Total Time:", totalTime); // Debug log each route and its total time

      if (totalTime < shortestTime) {
        shortestTime = totalTime;
        shortestPath = route;
      }
    }

    res.json({ shortestPath });
  } catch (error) {
    console.error("Error fetching data from Google Maps API:", error);
    res.status(500).json({ error: "Error fetching data from Google Maps API" });
  }
});

function permute(arr) {
  let first = [arr[0]];
  let last = [arr[arr.length - 1]];
  let nums = arr.slice(1, arr.length - 1);
  var result = [];
  var backtrack = (i, nums) => {
    if (i === nums.length) {
      result.push(first.concat(nums.slice(), last));
      return;
    }
    for (let j = i; j < nums.length; j++) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      backtrack(i + 1, nums);
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  };
  backtrack(0, nums);
  return result;
}

module.exports = app;
