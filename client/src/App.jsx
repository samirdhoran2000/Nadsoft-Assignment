import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const App = () => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleEdit = (id) => {
    setSelectedStudentId(id);
  };

  const handleSuccess = () => {
    setSelectedStudentId(null);
  };

  return (
    <div className="container mt-5" >
      <h1 className="mb-4">Student Management</h1>
      <StudentForm
        selectedStudentId={selectedStudentId}
        onSuccess={handleSuccess}
      />
      <hr />
      <StudentList onEdit={handleEdit} />
    </div>
  );
};

export default App;
