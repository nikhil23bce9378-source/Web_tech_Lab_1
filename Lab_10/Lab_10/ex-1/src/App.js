import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!name) err.name = "Name is required";
    if (!email) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      err.email = "Invalid email format";
    }
    if (!password) err.password = "Password is required";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted Successfully ✅");

      setName("");
      setEmail("");
      setPassword("");
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <h1>User Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;