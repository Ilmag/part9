import allPatients from "../../data/patients";
import { EntryWithoutId, Patient } from "../types";
import { v1 as uuid } from "uuid";

const addEntry = (id: string, entry: EntryWithoutId): Patient | string => {
  const patient = allPatients.find((p) => p.id === id);
  if (patient) {
    const patientWithNewEntry: Patient = patient;
    const entryID: string = uuid();
    const newEntry = {
      id: entryID,
      ...entry,
    };
    patientWithNewEntry.entries.push(newEntry);
    return patientWithNewEntry;
  } else {
    return "Not found";
  }
};

export default addEntry;
