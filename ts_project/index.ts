import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { rateWork } from "./exercises";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi/:height?:weight?", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  res.send(calculateBmi(height, weight));
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  console.log(typeof daily_exercises, typeof target);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    result = rateWork(daily_exercises, target);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (error instanceof Error) {
      result = error.message;
    }
  }
  // try {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //   result = rateWork(daily_exercises, target);
  // } catch (error) {
  //   console.log(error);
  // }
  res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
