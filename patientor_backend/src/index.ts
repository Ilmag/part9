import express from "express";
import cors from "cors";
import diagnoseRouter from "./route/diagnose";
import patientRouter from "./route/patient";
import entryRouter from "./route/entry";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("request");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);

app.use("/api/patients", patientRouter);

app.use("/api/patients", entryRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
