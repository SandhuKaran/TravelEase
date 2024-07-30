const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

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
  let minTimeMatrix = null;

  try {
    const or = addresses.slice(0, -1).join("|");
    const de = addresses.slice(1).join("|");

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${or}&destinations=${de}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(url);
    const result = response.data;

    minTimeMatrix = result;

    for (const route of permutations) {
      let totalTime = 0;
      for (let i = 0; i < route.length - 2; i++) {
        const fromIndex = i;
        const toIndex = i + 1;
        totalTime +=
          minTimeMatrix.rows[fromIndex].elements[toIndex].duration.value;
      }

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
