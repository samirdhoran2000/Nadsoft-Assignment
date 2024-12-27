import React, { useState, useEffect } from "react";
import { createStudent, updateStudent } from "../services/api";
import Swal from "sweetalert2";

const StudentForm = ({ onSubmitSuccess, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        age: initialData.age || "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        const response = await updateStudent(initialData.id, {
          name: formData.name,
          email: formData.email,
          age: parseInt(formData.age),
        });
        if (response.data.message) {
          Swal.fire("Success", "Student updated successfully", "success");
          onSubmitSuccess();
        }
      } else {
        const response = await createStudent({
          name: formData.name,
          email: formData.email,
          age: parseInt(formData.age),
        });
        if (response.data) {
          Swal.fire("Success", "Student created successfully", "success");
          setFormData({ name: "", email: "", age: "" });
          onSubmitSuccess();
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Operation failed",
        "error"
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {initialData ? "Edit Student" : "Add New Student"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {initialData ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
