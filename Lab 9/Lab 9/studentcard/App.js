import React from "react";
import StudentCard from "./components/StudentCard";
import "./App.css";

function App() {

  const students = [
    { name: "Rahul", department: "CSE", marks: 85 },
    { name: "Ananya", department: "ECE", marks: 90 },
    { name: "Karthik", department: "Mechanical", marks: 78 }
  ];

  return (
    <div className="App">
      <h1>Student Cards</h1>

      {students.map((student, index) => (
        <StudentCard
          key={index}
          name={student.name}
          department={student.department}
          marks={student.marks}
        />
      ))}

    </div>
  );
}

export default App;