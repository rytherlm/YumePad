import React from "react";
import EntryCard from "./EntryCard";

const EntryList = ({ entries }) => {
  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntryList;
