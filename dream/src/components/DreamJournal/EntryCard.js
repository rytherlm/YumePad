import React from "react";
import { Link } from "react-router-dom";

const EntryCard = ({ entry }) => {
  const { id, title, content, date } = entry;

  return (
    <div className="entry-card">
      <div className="entry-title">{title}</div>
      <div className="entry-content">{content}</div>
      <div className="entry-date">{date.toDate().toLocaleDateString()}</div>
      <div className="entry-actions">
        <Link to={`/edit-entry/${id}`} className="entry-edit">
          Edit
        </Link>
        <Link to={`/delete-entry/${id}`} className="entry-delete">
          Delete
        </Link>
      </div>
    </div>
  );
};

export default EntryCard;
