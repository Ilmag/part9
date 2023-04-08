import { patientFields, NewPatient, Gender, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseText = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing text");
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (gender: Gender): boolean => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: Gender): string => {
  if (!isGender) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isRating = (rating: HealthCheckRating): boolean => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseRating = (rating: HealthCheckRating): number => {
  if (!isRating(rating)) {
    throw new Error("Incorrect or missing helthrating: " + rating);
  }
  return rating;
};

const isObject = (someObject: unknown): boolean => {
  return typeof someObject === "object";
};

const parseObject = (someObject: unknown): object => {
  if (!isObject(someObject) || !someObject) {
    throw new Error("Incorrect or missing object: " + someObject);
  }

  return someObject;
};

const checkPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: patientFields): NewPatient => {
  const toBeAdded = {
    name: parseText(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseText(ssn),
    gender: parseGender(gender),
    occupation: parseText(occupation),
    entries: entries,
  };

  return toBeAdded;
};

const checkID = (id: string): string => {
  if (!id || !isString(id)) {
    throw new Error("Incorrect or missing patient ID" + id);
  }
  return id;
};

const checkDiagnosisCodes = (codes: string[]): string[] => {
  if (!codes) {
    console.log("No codes!");
  }
  return codes;
};

export {
  checkPatient,
  checkID,
  parseDate,
  parseObject,
  parseText,
  parseGender,
  checkDiagnosisCodes,
  parseRating,
};
