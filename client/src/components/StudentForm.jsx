import React, { useState, useEffect } from "react";
import { createStudent, updateStudent, getStudentById } from "../services/api";
import Swal from "sweetalert2";

const StudentForm = ({ selectedStudentId, onSuccess }) => {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  useEffect(() => {
    if (selectedStudentId) {
      getStudentById(selectedStudentId).then(({ data }) => {
        setFormData({ name: data.name, email: data.email, age: data.age });
      });
    } else {
      setFormData({ name: "", email: "", age: "" });
    }
  }, [selectedStudentId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedStudentId) {
        await updateStudent(selectedStudentId, formData);
        Swal.fire("Success", "Student updated successfully", "success");
      } else {
        await createStudent(formData);
        Swal.fire("Success", "Student created successfully", "success");
      }
      setFormData({ name: "", email: "", age: "" });
      onSuccess();
    } catch (error) {
      Swal.fire("Error", error.response.data.error, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Age</label>
        <input
          type="number"
          className="form-control"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {selectedStudentId ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default StudentForm;
