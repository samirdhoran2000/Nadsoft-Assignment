import React, { useState, useEffect } from "react";
import { getMarksByStudentId, deleteMark } from "../services/api";
import Swal from "sweetalert2";
import MarkForm from "./MarkForm";

const MarkList = ({ studentId }) => {
  const [marks, setMarks] = useState([]);
  const [selectedMark, setSelectedMark] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchMarks = async () => {
    try {
      const response = await getMarksByStudentId(studentId);
      setMarks(response.data);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to fetch marks",
        "error"
      );
    }
  };

  useEffect(() => {
    if (studentId) fetchMarks();
  }, [studentId]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await deleteMark(id);
        if (response.data.message) {
          Swal.fire("Deleted!", "Mark has been deleted.", "success");
          fetchMarks();
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to delete mark",
        "error"
      );
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSelectedMark(null); 
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button className="btn btn-info" onClick={openModal}>
        View Marks
      </button>

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: showModal ? "rgba(0, 0, 0, 0.5)" : "none" }}
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Student Marks</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <MarkForm
                studentId={studentId}
                onSubmitSuccess={() => {
                  setSelectedMark(null);
                  fetchMarks();
                }}
                initialData={selectedMark}
              />
              <div className="table-responsive">
                <table className="table">
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
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => setSelectedMark(mark)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(mark.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkList;
