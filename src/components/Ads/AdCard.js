import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { MdEdit, MdModeEdit, MdDelete } from "react-icons/md";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import {
  Avatar,
  Box,
  Button,
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
  purple,
} from "@mui/material/colors";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Mailto = ({ email, subject, body, ...props }) => {
  return (
    <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
      {props.children}
    </a>
  );
};

export const AdCard = ({
  ad,
  deleteAd,
  link,
  editAd,
  mailto,
  noWrap = false,
}) => {
  const { currentUser } = useAuth();
  const history = useHistory();
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

  const categoryTitle = () => {
    if (ad.category === "bygg") {
      return "Bygg & verktyg";
    } else if (ad.category === "hem") {
      return "Hem & trädgård";
    } else if (ad.category === "sport") {
      return "Sport & fritid";
    } else {
      return "Övrigt";
    }
  };

  const routeChangeEdit = () => {
    let path = `/edit-ad/ + ${ad.id}`;
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
        {/* <CardHeader
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
        /> */}
        <CardHeader
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1.8,
            bgcolor: categoryColor(),
            height: "1px",
          }}
          title={
            <Typography variant="subtitle2" color="white">
              {categoryTitle()}
            </Typography>
          }
        />
        <CardContent
          sx={{
            "&: last-child": {
              paddingBottom: 1.8,
            },
          }}
        >
          <Typography variant="h6">{ad.title}</Typography>

          <Typography
            sx={{ pb: 2 }}
            noWrap={noWrap}
            variant="body1"
            gutterBottom
          >
            {ad.desc}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "bottom",
            }}
          >
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              Utlånas av {ad.userName}
            </Typography>
            {link && (
              <Typography variant="body2">
                <Link to={link}>Läs mer</Link>
              </Typography>
            )}

            {deleteAd && (
              <MdDelete
                size={25}
                onClick={() => {
                  const confirmBox = window.confirm(
                    "Är du säker på att du vill ta bort annonsen?"
                  );
                  if (confirmBox === true) {
                    deleteAd(ad);
                  }
                }}
              />
            )}
            {editAd && (
              <Link to={editAd}>
                <MdEdit size={25} />
              </Link>
            )}
          </Box>

          {mailto && (
            <Button
              variant="outlined"
              sx={{
                width: "100%",
                mt: "10px",
              }}
            >
              <Mailto
                Mailto
                email={ad.userEmail}
                subject={`Annons "${ad.title}"`}
                body={`Hej! Jag skriver angående din annons "${ad.title}" på minimera.`}
              >
                Kontakta {ad.userName}
              </Mailto>
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
};
