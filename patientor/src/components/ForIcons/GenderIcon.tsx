import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Gender } from "../../types";

interface Props {
  name: string;
  gender: Gender;
}

const floatStyle = {
  display: "flex",
  flexDirection: "row" as "row",
};

const GernderIcon = ({ name, gender }: Props) => {
  if (gender === "male") {
    return (
      <div style={floatStyle}>
        <h2>{name}</h2>
        <MaleIcon />
      </div>
    );
  } else if (gender === "female") {
    return (
      <div style={floatStyle}>
        <h2>{name}</h2>
        <FemaleIcon />
      </div>
    );
  } else if (gender === "other") {
    return (
      <div style={floatStyle}>
        <h2>{name}</h2>
        <TransgenderIcon />
      </div>
    );
  } else {
    return null;
  }
};

export default GernderIcon;
