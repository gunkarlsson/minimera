import { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function CreateAd() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }
  };

  const [ads, setAds] = useState([]);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const currentUserId = currentUser ? currentUser.uid : null;

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(title, desc);
  //     setTitle("");
  //     setDesc("");
  //   };
  //TUTORIAL WAY: BETTER PERFORMANCE + INSTANT UPDATE
  const ref = db.collection("group1");

  const getAds = () => {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAds(items);
      setLoading(false);
      console.log(currentUser.email, currentUser.name);
    });
  };

  useEffect(() => {
    getAds();
  }, []);

  const addAd = (newAd) => {
    ref
      .doc(newAd.id)
      // .doc(); use this is for some reason you want firebase to create the id
      .set(newAd)
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <Typography
        component="h1"
        variant="h6"
        color="textSecondary"
        gutterBottom
      >
        Create a new note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disableElevation
          onClick={() => addAd({ title, desc, id: uuidv4() })}
        >
          Submit
        </Button>
      </form>

      {loading ? <h1>Loading...</h1> : null}

      {ads.map((ad) => (
        <div className="ad" key={ad.id}>
          <h2>{ad.title}</h2>
          <p>{ad.desc}</p>
        </div>
      ))}
    </Container>
  );
}
