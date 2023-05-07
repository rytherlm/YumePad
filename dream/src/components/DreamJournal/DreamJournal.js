import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { firestore } from '../firebase';
import NewEntryForm from './NewEntryForm';
import EntryList from './EntryList';
import DreamJournal from './DreamJournal';


function DreamJournal() {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore.collection('entries')
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const newEntries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(newEntries);
        setLoading(false);
      });

    return unsubscribe;
  }, [currentUser]);

  const addEntry = (entry) => {
    const { title, content } = entry;
    const newEntry = {
      title,
      content,
      userId: currentUser.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
      level: 1,
    };
    firestore.collection('entries').add(newEntry);
  };

  const deleteEntry = (id) => {
    firestore.collection('entries').doc(id).delete();
  };

  const updateEntry = (id, updatedEntry) => {
    const { title, content, level } = updatedEntry;
    firestore.collection('entries').doc(id).update({
      title,
      content,
      level,
    });
  };

  return (
    <>
      <h2>Dream Journal</h2>
      <NewEntryForm addEntry={addEntry} />
      <EntryList
        entries={entries}
        deleteEntry={deleteEntry}
        updateEntry={updateEntry}
        loading={loading}
      />
    </>
  );
}

export default DreamJournal;
