import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteItem from "./components/NoteItem";
import Pagination from "./components/Pagination";
import "./style.css";

const App = () => {
  const notesPerPage = 10;
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (note) => {
    if (note.id) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
    } else {
      note.id = Date.now().toString();
      setNotes([...notes, note]);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center">Simple Note Taking App</h1>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-75"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <NoteForm onSave={handleSaveNote} />
      </div>
      <div id="notes-list">
        {paginatedNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={handleDeleteNote}
            onSave={handleSaveNote}
          />
        ))}
      </div>
      <Pagination
        totalNotes={filteredNotes.length}
        notesPerPage={notesPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
