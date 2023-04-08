import allDiagnoses from "../../data/diagnoses";

import { Diagnose } from "../types";

const getAllDiagnoses = (): Diagnose[] => {
  return allDiagnoses;
};

export default getAllDiagnoses;
