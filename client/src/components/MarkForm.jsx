import React, { useState, useEffect } from "react";
import { createMark, updateMark } from "../services/api";
import Swal from "sweetalert2";

const MarkForm = ({ studentId, onSubmitSuccess, initialData = null }) => {
  const [formData, setFormData] = useState({
    subject: "",
    mark: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        subject: initialData.subject || "",
        mark: initialData.mark || "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        const response = await updateMark(initialData.id, {
          subject: formData.subject,
          mark: parseInt(formData.mark),
        });
        if (response.data.message) {
          Swal.fire("Success", "Mark updated successfully", "success");
          onSubmitSuccess();
        }
      } else {
        const response = await createMark({
          student_id: studentId,
          subject: formData.subject,
          mark: parseInt(formData.mark),
        });
        if (response.data) {
          Swal.fire("Success", "Mark added successfully", "success");
          setFormData({ subject: "", mark: "" });
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
          {initialData ? "Edit Mark" : "Add New Mark"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mark</label>
            <input
              type="number"
              className="form-control"
              name="mark"
              value={formData.mark}
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

export default MarkForm;
