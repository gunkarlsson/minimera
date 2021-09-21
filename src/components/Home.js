import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { PrimarySection } from "../style/StyledComponents";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [currentArea, setCurrentArea] = useState();

  //TUTORIAL WAY: BETTER PERFORMANCE + INSTANT UPDATE
  // const ref = db.collection("allAds");

  // get area from firestore
  // useEffect(() => {
  //   db.collection("users")
  //     .get()
  //     .then((snapshot) => {
  //       let documents = [];
  //       snapshot.docs.forEach((doc) => {
  //         documents.push(doc.data());
  //       });
  //       setCurrentArea(documents[0].area);
  //       console.log(currentArea);
  //     });
  // }, [currentUser.uid, currentArea]);

  const getAds = () => {
    setLoading(true);
    db.collection("allAds")
      // .where("area", "==", "north")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setAds(items);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAds();
  }, []);

  return (
    <PrimarySection>
      <h1>All Ads</h1>

      {loading ? <h1>Loading...</h1> : null}

      {ads.map((ad) => (
        <div className="ad" key={ad.id}>
          <h3>{ad.title}</h3>
          <p>{ad.desc}</p>
          <p>userId: {ad.userId}</p>
          <p>author email: {ad.authorEmail}</p>
        </div>
      ))}
    </PrimarySection>
  );
};

export default Home;
