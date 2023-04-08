import FavoriteIcon from "@mui/icons-material/Favorite";
import { HealthCheckRating } from "../../types";

interface Props {
  rating: HealthCheckRating;
}

const styleGreen = {
  color: "green",
};

const styleBlue = {
  color: "blue",
};

const stylePurple = {
  color: "purple",
};

const styleRed = {
  color: "red",
};

const HealthIcon = (props: Props) => {
  if (props.rating === 0) {
    return <FavoriteIcon style={styleGreen} />;
  } else if (props.rating === 1) {
    return <FavoriteIcon style={styleBlue} />;
  } else if (props.rating === 2) {
    return <FavoriteIcon style={stylePurple} />;
  } else if (props.rating === 3) {
    return <FavoriteIcon style={styleRed} />;
  } else {
    return <h1>No rating</h1>;
  }
};
export default HealthIcon;
