import React, { useState, useEffect } from "react";
import { getStudents, deleteStudent } from "../services/api";
import Swal from "sweetalert2";
import Pagination from "./Pagination";
import StudentForm from "./StudentForm";
import MarkList from "./MarkList";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marksStudentId, setMarksStudentId] = useState(null); // For managing the modal state
  const limit = 10;

  const fetchStudents = async () => {
    try {
      const response = await getStudents(currentPage, limit);
      setStudents(response.data.data);
      setTotalRecords(response.data.total);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch students", "error");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

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
        const response = await deleteStudent(id);
        if (response.data.message) {
          Swal.fire("Deleted!", "Student has been deleted.", "success");
          fetchStudents();
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to delete student",
        "error"
      );
    }
  };

  const openMarksModal = (studentId) => setMarksStudentId(studentId);
  const closeMarksModal = () => setMarksStudentId(null);

  return (
    <div className="container mt-4">
      <StudentForm
        initialData={selectedStudent}
        onSubmitSuccess={() => {
          setSelectedStudent(null);
          fetchStudents();
        }}
      />

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Students List</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => setSelectedStudent(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => openMarksModal(student.id)}
                      >
                        View Marks
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalRecords / limit)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Marks Modal */}
      {marksStudentId && (
        <div
          className={`modal fade show d-block`}
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-hidden={marksStudentId === null}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Marks for Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeMarksModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <MarkList studentId={marksStudentId} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeMarksModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
