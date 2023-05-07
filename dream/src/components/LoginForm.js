import React from "react";

const RegistrationForm = () => {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
