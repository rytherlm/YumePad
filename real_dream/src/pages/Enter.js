import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase-config";
import { auth } from "../firebase-config";

function Enter() {
  const [content, setContent] = useState('');
  const [timeLeft, setTimeLeft] = useState(24);
  const [isDisabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserLastSubmitted = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          calculateTimeLeft(docSnap.data()?.lastSubmitted?.toDate());
        } else {
          // This is the user's first visit. Initialize their data.
          const nextMidnight = new Date();
          nextMidnight.setDate(nextMidnight.getDate() + 1);
          nextMidnight.setHours(0,0,0,0);
          await setDoc(docRef, { lastSubmitted: nextMidnight });
          setDisabled(false);
        }
      }
    };

    fetchUserLastSubmitted();
  }, []);

  function calculateTimeLeft(lastSubmitted) {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setDate(nextMidnight.getDate() + 1);
    nextMidnight.setHours(0, 0, 0, 0);
    const timeLeft = Math.max((nextMidnight - now) / (1000 * 60 * 60), 0);
    setTimeLeft(timeLeft.toFixed(2));
    setDisabled(timeLeft > 0);
  }
  

  const handleDreamSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() !== '') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const lastSubmittedDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() - 1);

      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        const lastSubmitted = userDocSnap.data()?.lastSubmitted?.toDate();

        if (!lastSubmitted || lastSubmitted < lastSubmittedDate) {
          await addDoc(collection(db, "dreams"), {
            content: content,
            user: auth.currentUser.uid,
            timestamp: serverTimestamp()
          });

          await setDoc(userDocRef, { lastSubmitted: serverTimestamp() }, { merge: true });

          setContent('');
          setErrorMessage('');
        } else {
          setErrorMessage('You have already submitted a dream today. Try again tomorrow.');
        }
      }
    }
  };

  return (
    <div className="dream-entry-container">
      <form onSubmit={handleDreamSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          disabled={isDisabled}
          className={errorMessage ? 'shake' : ''}
        />
        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      {timeLeft > 0 && (
        <div className="timer">
          Next dream entry allowed in: {timeLeft} hours
        </div>
      )}
    </div>
  );
}

export default Enter;
