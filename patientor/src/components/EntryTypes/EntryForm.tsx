import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { Theme, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";

import { EntryWithoutId, Patient } from "../../types";

import { useState, SyntheticEvent } from "react";
import { HealthCheckRating } from "../../types";

import { createEntry } from "../../services/entry";

import axios from "axios";

interface Props {
  diagnosisCodes: string[] | undefined;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  patientID: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

function getStyles(code: string, selectedCode: string[], theme: Theme) {
  return {
    fontWeight:
      selectedCode.indexOf(code) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const EntryForm = ({
  diagnosisCodes,
  showForm,
  setShowForm,
  patientID,
  setPatient,
}: Props) => {
  const [careType, setCareType] = useState<string>("HealthCheck");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const theme = useTheme();
  const [healtRating, setHealtRating] = useState<HealthCheckRating>(0);
  const [employer, setEmployer] = useState<string>("");
  const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [error, setError] = useState<string>();

  const radioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareType(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedCodes>) => {
    const {
      target: { value },
    } = event;
    setSelectedCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const dispNoneStyle = {
    display: "none",
  };

  const dispFlexStyle = {
    display: "flex",
  };

  const clearAll = () => {
    setDescription("");
    setSpecialist("");
    setDate("");
    setSelectedCodes([]);
    setHealtRating(0);
    setEmployer("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setDischargeDate("");
    setDischargeCriteria("");
    setShowForm(false);
  };

  const sendNewEntry = async (newEntry: EntryWithoutId) => {
    try {
      const patientWithNewEntry: Patient = await createEntry(
        patientID,
        newEntry
      );
      setPatient(patientWithNewEntry);
      setError(undefined);
      console.log("after", error);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data;
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (careType === "HealthCheck") {
      sendNewEntry({
        type: careType,
        description: description,
        date: date,
        diagnosisCodes: selectedCodes,
        healthCheckRating: healtRating,
        specialist: specialist,
      });
      if (!error) {
        setShowForm(true);
      } else {
        clearAll();
      }
    } else if (careType === "OccupationalHealthcare") {
      sendNewEntry({
        type: careType,
        description: description,
        date: date,
        diagnosisCodes: selectedCodes,
        employerName: employer,
        specialist: specialist,
        sickLeave: {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd,
        },
      });
      if (!error) {
        setShowForm(true);
      } else {
        clearAll();
      }
    } else if (careType === "Hospital") {
      sendNewEntry({
        type: careType,
        description: description,
        date: date,
        diagnosisCodes: selectedCodes,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
        specialist: specialist,
      });
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <FormControl>
        <FormLabel>Healthcare Types</FormLabel>
        <RadioGroup row onChange={radioSelect} defaultValue="HealthCheck">
          <FormControlLabel
            value="HealthCheck"
            control={<Radio />}
            label="Health Check"
          />
          <FormControlLabel
            value="OccupationalHealthcare"
            control={<Radio />}
            label="Occupational Healthcare"
          />
          <FormControlLabel
            value="Hospital"
            control={<Radio />}
            label="Hospital"
          />
        </RadioGroup>
        <TextField
          label="description"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
        />
        <TextField
          label="date"
          type="date"
          value={date}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDate(event.target.value)
          }
        />
        <Select
          multiple
          value={selectedCodes}
          input={<OutlinedInput label="Diagnosis Codes" />}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {diagnosisCodes?.map((code) => (
            <MenuItem
              key={code}
              value={code}
              style={getStyles(code, selectedCodes, theme)}
            >
              {code}
            </MenuItem>
          ))}
        </Select>
        <FormControl>
          <Select
            label="Health Rating"
            value={healtRating.toString()}
            onChange={(event: SelectChangeEvent) =>
              setHealtRating(Number(event.target.value))
            }
            style={careType === "HealthCheck" ? dispFlexStyle : dispNoneStyle}
          >
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>LowRisk</MenuItem>
            <MenuItem value={2}>HighRisk</MenuItem>
            <MenuItem value={3}>CriticalRisk</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="employer"
          value={employer}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmployer(event.target.value)
          }
          style={
            careType === "OccupationalHealthcare"
              ? dispFlexStyle
              : dispNoneStyle
          }
        />
        <TextField
          label="sickleave (start)"
          type="date"
          value={sickLeaveStart}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSickLeaveStart(event.target.value)
          }
          style={
            careType === "OccupationalHealthcare"
              ? dispFlexStyle
              : dispNoneStyle
          }
        />
        <TextField
          label="sickleave (end)"
          type="date"
          value={sickLeaveEnd}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSickLeaveEnd(event.target.value)
          }
          style={
            careType === "OccupationalHealthcare"
              ? dispFlexStyle
              : dispNoneStyle
          }
        />
        <TextField
          label="discharge date"
          type="date"
          value={dischargeDate}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDischargeDate(event.target.value)
          }
          style={careType === "Hospital" ? dispFlexStyle : dispNoneStyle}
        />
        <TextField
          label="discharge criteria"
          value={dischargeCriteria}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDischargeCriteria(event.target.value)
          }
          style={careType === "Hospital" ? dispFlexStyle : dispNoneStyle}
        />
        <TextField
          label="specialist"
          value={specialist}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSpecialist(event.target.value)
          }
        />
        <Stack spacing={40} direction="row">
          <Button variant="contained" onClick={clearAll}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" onClick={addEntry}>
            Add
          </Button>
        </Stack>
      </FormControl>
    </div>
  );
};

export default EntryForm;
