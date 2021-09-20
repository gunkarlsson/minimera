import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/";
import { yellow, green, pink, blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (ad) => {
      if (ad.category == "work") {
        return yellow[700];
      }
      if (ad.category == "money") {
        return green[500];
      }
      if (ad.category == "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
});

export default function AdCard({ ad, handleDelete }) {
  const classes = useStyles(ad);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {/* {ad.category[0].toUpperCase()} */}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(ad.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={ad.title}
          subheader={ad.category}
        />
        <CardContent>
          {" "}
          <Link to={ROUTES.AD_DETAILS}>
            <Typography variant="body1" color="textSecondary">
              {ad.details}
            </Typography>{" "}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
