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
          // action={
          //   <IconButton onClick={() => handleDelete(ad.id)}>
          //     <DeleteOutlined />
          //   </IconButton>
          // }
          title={ad.title}
          subheader={ad.category}
        />
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
