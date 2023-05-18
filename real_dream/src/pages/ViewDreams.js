import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { db, auth } from "../firebase-config";

function ViewDreams() {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const fetchDreams = async () => {
        try {
          const q = query(collection(db, "dreams"), where("user", "==", auth.currentUser.uid));
          const querySnapshot = await getDocs(q);
          setDreams(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
          console.error("Failed to fetch dreams:", error);
        }
      };
  
      fetchDreams();
    }
  }, []);

  return (
    <div>
      {dreams.map((dream) => (
        <div key={dream.id}>
          <h2>{dream.title}</h2>
          <p>{dream.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewDreams;
