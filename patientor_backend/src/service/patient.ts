import allPatients from "../../data/patients";
import { PublicPatient, Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = allPatients;

const getPublicPatient = (): PublicPatient[] => {
  return allPatients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      entries,
    })
  );
};

const getPatientDetails = (id: string): Patient => {
  const patient: Patient = allPatients.find(
    (patient) => patient.id === id
  ) as Patient;
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient: Patient = {
    id: id,
    ...patient,
  };

  patients.push(newPatient);
  console.log(patients);
  return newPatient;
};

export default { getPublicPatient, addPatient, getPatientDetails };
