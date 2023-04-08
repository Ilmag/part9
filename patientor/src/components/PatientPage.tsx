import { useParams } from "react-router-dom";
import { Patient, Diagnose } from "../types";
import patientService from "../services/patients";
import diagnoseServise from "../services/diagnoses";
import { useEffect, useState } from "react";
import Hospital from "./EntryTypes/Hospital";
import OccupationalHealthcare from "./EntryTypes/OccupationalHealthcare";
import HealthCheck from "./EntryTypes/HealthCheck";
import { Button } from "@mui/material";
import GernderIcon from "./ForIcons/GenderIcon";
import EntryForm from "./EntryTypes/EntryForm";

const PatientDetails = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [fullDiagnoses, setFullDiagnoses] = useState<Diagnose[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        await patientService
          .getDetails(id)
          .then((details) => setPatient(details.data));
      }
    };

    const fetchDiagnoses = async () => {
      if (id) {
        await diagnoseServise.getAll().then((data) => {
          if (data.length) {
            setDiagnosisCodes(data.map((d) => d.code));
            setFullDiagnoses(data);
          }
        });
      }
    };

    fetchDetails();
    fetchDiagnoses();
  }, [id]);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const click = () => {
    setShowForm(!showForm);
  };

  if (patient?.entries.length) {
    return (
      <div>
        <GernderIcon name={patient.name} gender={patient.gender} />
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {showForm ? (
          <EntryForm
            diagnosisCodes={diagnosisCodes}
            showForm={showForm}
            setShowForm={setShowForm}
            patientID={id as string}
            setPatient={setPatient}
          />
        ) : null}
        <div>
          {patient.entries.map((entry) => {
            switch (entry.type) {
              case "Hospital":
                return (
                  <Hospital
                    entry={entry}
                    key={entry.id}
                    diagnoses={fullDiagnoses}
                  />
                );
              case "HealthCheck":
                return (
                  <HealthCheck
                    entry={entry}
                    key={entry.id}
                    diagnoses={fullDiagnoses}
                  />
                );
              case "OccupationalHealthcare":
                return (
                  <OccupationalHealthcare
                    entry={entry}
                    key={entry.id}
                    diagnoses={fullDiagnoses}
                  />
                );
              default:
                return assertNever(entry);
            }
          })}
        </div>
        <Button variant="contained" color="primary" onClick={click}>
          {showForm ? "close form" : "add new entry"}
        </Button>
      </div>
    );
  }
  if (patient) {
    return (
      <div>
        <h2>{patient.name}</h2>
        <p>gender: {patient.gender}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {showForm ? (
          <EntryForm
            diagnosisCodes={diagnosisCodes}
            showForm={showForm}
            setShowForm={setShowForm}
            patientID={id as string}
            setPatient={setPatient}
          />
        ) : null}
        <Button variant="contained" color="primary" onClick={click}>
          {showForm ? "close form" : "add new entry"}
        </Button>
      </div>
    );
  }
  return <h1>Not found</h1>;
};

export default PatientDetails;
