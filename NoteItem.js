import React from "react";
import NoteForm from "./NoteForm";

const NoteItem = ({ note, onDelete, onSave }) => (
  <div className="note-item">
    <h5>{note.title}</h5>
    <p>{note.content}</p>
    <p className="timestamp">
      Last Modified: {new Date(note.timestamp).toLocaleString()}
    </p>
    <NoteForm onSave={onSave} note={note} />
    <button className="btn btn-sm btn-danger" onClick={() => onDelete(note.id)}>
      Delete
    </button>
  </div>
);

export default NoteItem;
