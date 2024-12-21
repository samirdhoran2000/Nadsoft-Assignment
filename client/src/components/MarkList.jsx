import React, { useState, useEffect } from "react";
import { getMarksByStudentId, deleteMark } from "../services/api";
import { Table, Button } from "react-bootstrap";

const MarkList = ({ studentId }) => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await getMarksByStudentId(studentId);
        setMarks(response.data);
      } catch (error) {
        console.error("Failed to fetch marks", error);
      }
    };
    fetchMarks();
  }, [studentId]);

  const handleDelete = async (id) => {
    try {
      await deleteMark(id);
      setMarks(marks.filter((mark) => mark.id !== id));
    } catch (error) {
      console.error("Failed to delete mark", error);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Mark</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {marks.map((mark) => (
          <tr key={mark.id}>
            <td>{mark.subject}</td>
            <td>{mark.mark}</td>
            <td>
              <Button variant="danger" onClick={() => handleDelete(mark.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MarkList;
