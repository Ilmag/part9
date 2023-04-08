import { OccupationalHealthcareEntry, Diagnose } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnose[];
}

const OccupationalHealthcare = (props: Props) => {
  const entryStyle = {
    borderColor: "black",
    borderStyle: "solid",
    marginTop: "5px",
    marginBottom: "5px",
    paddingLeft: "10px",
  };

  const codeName = props.diagnoses.filter((d) =>
    props.entry.diagnosisCodes?.includes(d.code)
  );

  return (
    <div style={entryStyle}>
      <p>
        {props.entry.date} {props.entry.type}
      </p>
      <p>{props.entry.description}</p>
      <ul>
        {props.entry.diagnosisCodes?.length
          ? codeName.map((c) => (
              <li key={c.code}>
                {c.code} {c.name}
              </li>
            ))
          : null}
      </ul>
      <p>sickleave(start): {props.entry.sickLeave?.startDate}</p>
      <p>sickleave(end): {props.entry.sickLeave?.endDate}</p>
      <p>diagnose by {props.entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcare;
