import express from "express";
import patientService from "../service/patient";
import { checkPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.send(patientService.getPublicPatient());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatientDetails(id));
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = checkPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    console.log("added", addedPatient);
    res.json(addedPatient);
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).send(message);
  }
});

export default router;
