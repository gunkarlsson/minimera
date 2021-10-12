import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import {
  teal,
  amber,
  pink,
  blue,
  cyan,
  green,
  indigo,
  yellow,
  orange,
  deepPurple,
  purple,
  red,
  deepOrange,
} from "@mui/material/colors";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AlertDialog } from "../AlertDialog";

const Mailto = ({ email, subject, body, ...props }) => {
  return (
    <a
      style={{ textDecoration: "none" }}
      href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}
    >
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
      return amber[500];
    } else if (ad.category === "sport") {
      return purple[500];
    } else {
      return blue[500];
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
        {/* <CardActionArea component={Link} to={link}> */}

        <CardHeader
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1.8,
            bgcolor: categoryColor(),
            height: "1px",
          }}
          title={
            <Typography component="h3" variant="subtitle2" color="white">
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
          <Typography component="h2" variant="h6">
            {ad.title}
          </Typography>

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
              <DeleteIcon
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
                <EditRoundedIcon />
              </Link>
            )}
          </Box>

          {mailto && (
            <Button
              variant="contained"
              disableElevation
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
