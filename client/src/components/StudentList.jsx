import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/api";
import Swal from "sweetalert2";
import Pagination from "./Pagination";

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  const fetchStudents = async (page) => {
    const { data } = await getStudents(page, 5);
    setStudents(data.data);
    setTotalPages(Math.ceil(data.total / 5));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteStudent(id);
        Swal.fire("Deleted!", "Student has been deleted.", "success");
        fetchStudents(page);
      }
    });
  };

  return (
    <>
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
                  className="btn btn-warning me-2"
                  onClick={() => onEdit(student.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
};

export default StudentList;
