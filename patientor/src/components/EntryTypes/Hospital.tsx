import { HospitalEntry, Diagnose } from "../../types";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnose[];
}

const Hospital = (props: Props) => {
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
      <p>discharge date: {props.entry.discharge.date}</p>
      <p>discharge criteria: {props.entry.discharge.criteria}</p>
      <p>diagnose by {props.entry.specialist}</p>
    </div>
  );
};

export default Hospital;
