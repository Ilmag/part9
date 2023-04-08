import { HealthCheckEntry, Diagnose } from "../../types";
import HealthIcon from "../ForIcons/HealthIcon";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnose[];
}

const HealthCheck = (props: Props) => {
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
      <HealthIcon rating={props.entry.healthCheckRating} />
      <ul>
        {props.entry.diagnosisCodes?.length
          ? codeName.map((c) => (
              <li key={c.code}>
                {c.code} {c.name}
              </li>
            ))
          : null}
      </ul>
      <p>diagnose by {props.entry.specialist}</p>
    </div>
  );
};

export default HealthCheck;
