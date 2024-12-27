import React from "react";
import StudentList from "./components/StudentList";

function App() {
  return (
    <div className="container " style={{
      width:"100vw"
    }}>
      <h1 className="text-center my-4">Student Management System</h1>
      <StudentList />
    </div>
  );
}

export default App;
