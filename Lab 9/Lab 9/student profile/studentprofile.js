import React from "react";

function StudentProfile() {

  const name = "Rahul Kumar";
  const department = "Computer Science Engineering";
  const year = "3rd Year";
  const section = "A";

  return (
    <div style={{
      border: "2px solid black",
      padding: "20px",
      width: "300px",
      margin: "20px auto",
      borderRadius: "10px"
    }}>
      <h2>Student Profile</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Section:</strong> {section}</p>
    </div>
  );
}

export default StudentProfile;