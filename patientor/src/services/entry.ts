import axios from "axios";
import { EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const createEntry = async (id: string, object: EntryWithoutId) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export { createEntry };
