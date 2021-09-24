import { FaTrashAlt } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  IconButton,
  Typography,
  Avatar,
  capitalize,
} from "@mui/material";
import { teal, amber } from "@mui/material/colors";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { AdDetails } from "./AdDetails";

export const AdCard = ({ ad, deleteAd }) => {
  const { currentUser } = useAuth();
  const isMyAd = ad.userId === currentUser.uid;

  return (
    <Card elevation={1}>
      <CardActionArea>
        <CardHeader
          sx={{
            borderBottom: 1,
            justifyContent: "center",
          }}
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
          action={
            <IconButton
              size="small"
              onClick={() => {
                const confirmBox = window.confirm(
                  "Are you sure you want to delete ad?"
                );
                if (confirmBox === true) {
                  deleteAd(ad);
                }
              }}
            >
              <FaTrashAlt />
            </IconButton>
          }
        />

        <CardContent>
          <Typography variant="body1" gutterBottom>
            {ad.desc}
          </Typography>

          <Typography variant="body2">
            {ad.area}, {ad.userName}, {ad.userEmail}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
