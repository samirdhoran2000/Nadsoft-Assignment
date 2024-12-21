import React, { useState } from "react";
import { createMark, updateMark } from "../services/api";
import { Button, Form } from "react-bootstrap";

const MarkForm = ({ studentId, markData, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    subject: markData?.subject || "",
    mark: markData?.mark || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (markData?.id) {
        await updateMark(markData.id, formData);
      } else {
        await createMark({ ...formData, student_id: studentId });
      }
      onFormSubmit();
    } catch (error) {
      console.error("Failed to save mark", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Mark</Form.Label>
        <Form.Control
          type="number"
          name="mark"
          value={formData.mark}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default MarkForm;
