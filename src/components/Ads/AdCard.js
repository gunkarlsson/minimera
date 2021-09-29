import { FaTrashAlt, FaEdit } from "react-icons/fa";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
  capitalize,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { teal, amber } from "@mui/material/colors";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    margin: "15px 5px",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
  },
});

const Mailto = ({ email, subject, body, ...props }) => {
  return (
    <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
      {props.children}
    </a>
  );
};
export const AdCard = ({ ad, deleteAd, link, editAd, mailto }) => {
  const { currentUser } = useAuth();
  const isMyAd = ad.userId === currentUser.uid;
  const classes = useStyles(ad);
  const history = useHistory();

  const routeChange = () => {
    let path = `/edit-ad/ + ad.id`;
    history.push(path);
  };

  return (
    <>
      <Card elevation={1} className={classes.card}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar
                sx={isMyAd ? { bgcolor: amber[400] } : { bgcolor: teal[400] }}
              >
                {ad.category[0].toUpperCase()}
              </Avatar>
            }
            title={<Typography variant="h6">{ad.title}</Typography>}
            subheader={
              <Typography variant="subtitle2" color="textSecondary">
                {capitalize(ad.category)}
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="body1" gutterBottom>
              {ad.desc}
            </Typography>

            <Typography variant="body2">
              {ad.area}, {ad.userName}, {ad.userEmail}
            </Typography>

            {link && <Link to={link}>To details</Link>}
            {mailto && (
              <Mailto
                Mailto
                email="test@test.se"
                subject="Hello"
                body="Hello world!"
              >
                Contact
              </Mailto>
            )}
            {deleteAd && (
              <FaTrashAlt
                onClick={() => {
                  const confirmBox = window.confirm(
                    "Are you sure you want to delete ad?"
                  );
                  if (confirmBox === true) {
                    deleteAd(ad);
                  }
                }}
              />
            )}
            {editAd && <FaEdit onClick={routeChange} />}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
