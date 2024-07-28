import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NoteForm = ({ onSave, note = {} }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      id: note.id,
      title,
      content,
      timestamp: new Date().toISOString(),
    });
    setShow(false);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        {note.id ? "Edit Note" : "Add Note"}
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{note.id ? "Edit Note" : "Add Note"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group controlId="note-title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="note-content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Note
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NoteForm;
