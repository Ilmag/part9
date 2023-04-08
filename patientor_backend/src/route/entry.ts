import express from "express";
import {
  parseDate,
  parseObject,
  parseText,
  checkDiagnosisCodes,
  parseRating,
} from "../utils";
import addEntry from "../service/entry";
import { BaseWithoutId, EntryWithoutId, Patient } from "../types";

const router = express.Router();

router.post("/:id/entries", (req, res) => {
  try {
    const id = parseText(req.params.id);
    const baseEntry: BaseWithoutId = {
      description: parseText(req.body.description),
      date: parseDate(req.body.date),
      specialist: parseText(req.body.specialist),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      diagnosisCodes: checkDiagnosisCodes(req.body.diagnosisCodes),
    };
    if (req.body.type === "HealthCheck") {
      const entry: EntryWithoutId = {
        ...baseEntry,
        type: "HealthCheck",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        healthCheckRating: parseRating(req.body.healthCheckRating),
      };
      const patientWithNewEntry: Patient | string = addEntry(id, entry);
      res.json(patientWithNewEntry);
    } else if (req.body.type === "OccupationalHealthcare") {
      const sickLeave = req.body.sickLeave
        ? parseObject(req.body.sickLeave)
        : undefined;
      const entry: EntryWithoutId = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseText(req.body.employerName),
        sickLeave: sickLeave,
      };
      const patientWithNewEntry: Patient | string = addEntry(id, entry);
      res.json(patientWithNewEntry);
    } else if (req.body.type === "Hospital") {
      const entry: EntryWithoutId = {
        ...baseEntry,
        type: "Hospital",
        discharge: parseObject(req.body.discharge),
      };
      const patientWithNewEntry: Patient | string = addEntry(id, entry);
      res.json(patientWithNewEntry);
    }
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).send(message);
  }
});

export default router;
