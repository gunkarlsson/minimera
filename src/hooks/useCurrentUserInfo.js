import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";

const useCurrentUserInfo = () => {
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = (await getDoc(docRef)).data();
        setUserInfo(docSnap);
      }
    };
    getUserInfo();
  }, [currentUser]);

  return userInfo;
};

export default useCurrentUserInfo;
