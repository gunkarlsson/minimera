import { FaTrashAlt, FaEdit } from "react-icons/fa";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
  capitalize,
} from "@mui/material";
import {
  teal,
  amber,
  pink,
  blue,
  green,
  indigo,
  yellow,
  orange,
} from "@mui/material/colors";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";

const Mailto = ({ email, subject, body, ...props }) => {
  return (
    <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
      {props.children}
    </a>
  );
};

export const AdCard = ({ ad, deleteAd, link, editAd, mailto }) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const descFull = ad.desc;
  const descSummary = ad.desc;
  // const isMyAd = ad.userId === currentUser.uid;

  const categoryColor = () => {
    if (ad.category === "bygg") {
      return pink[300];
    } else if (ad.category === "hem") {
      return amber[400];
    } else if (ad.category === "sport") {
      return teal[400];
    } else {
      return blue[400];
    }
  };

  const routeChangeDetails = () => {
    let path = `/ad-details/ + ad.id`;
    history.push(path);
  };

  const routeChangeEdit = () => {
    let path = `/edit-ad/ + ad.id`;
    history.push(path);
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          mx: 1,
          my: 2,
          boxShadow: "2px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <CardActionArea>
          <CardHeader
            sx={{ display: "flex", flexDirection: "row", p: 2, pb: 1 }}
            avatar={
              <Avatar sx={{ bgcolor: categoryColor() }}>
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
          <CardContent sx={{ pt: 0 }}>
            {/* {descsummary ? (
              <Typography variant="body1" sx={{ pb: 2 }} gutterBottom>
                {ad.desc.toUpperCase()}
              </Typography>
            ) : (
              <Typography variant="body1" sx={{ pb: 2 }} gutterBottom>
                {ad.desc}
              </Typography>
            )} */}
            <Typography variant="body1" sx={{ pb: 2 }} gutterBottom>
              {ad.desc}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                Utlånas av {ad.userName}
              </Typography>

              {link && (
                <Typography variant="body2">
                  <Link to={link}>Läs mer</Link>
                </Typography>
              )}
            </Box>
            {mailto && (
              <Typography variant="body1">
                <Mailto
                  Mailto
                  email="test@test.se"
                  subject="Hello"
                  body="Hello world!"
                >
                  Email {ad.userName}
                </Mailto>{" "}
              </Typography>
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
            {editAd && <FaEdit onClick={routeChangeEdit} />}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
