import axios from "axios";
import { Diagnose } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getByCodes = async (codes: any) => {
  const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);

  const forReturn: Diagnose[] = [];
  codes[0].forEach((code: any) => {
    forReturn.push(data.find((diagnose) => diagnose.code === code) as Diagnose);
  });

  // return data.filter((d) => codes.includes(d.code));
  return forReturn;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getByCodes };
