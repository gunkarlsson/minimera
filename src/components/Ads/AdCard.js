import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/";
import { yellow, green, pink, blue } from "@material-ui/core/colors";
import useCurrentUserInfo from "../../hooks/useCurrentUserInfo";
import { DeleteOutlined } from "@material-ui/icons";
import { currentUserInfo } from "../../hooks/useCurrentUserInfo";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (ad) => {
      if (ad.category == "bygg") {
        return yellow[700];
      }
      if (ad.category == "hem") {
        return green[500];
      }
      if (ad.category == "sport") {
        return pink[500];
      }
      return blue[500];
    },
  },
});

export default function AdCard({ ad, deleteAd }) {
  const classes = useStyles(ad);
  const currentUserInfo = useCurrentUserInfo();

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {/* {ad.category[0].toUpperCase()} */}
            </Avatar>
          }
          title={ad.title}
          subheader={ad.category}
        />
        <IconButton onClick={() => deleteAd(ad.id)}>
          <DeleteOutlined />
        </IconButton>
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {ad.desc}
            {ad.area}
            {ad.userName}
            {ad.userEmail}
          </Typography>{" "}
        </CardContent>
      </Card>
    </div>
  );
}
