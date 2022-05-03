import React from "react";
import { useNavigate } from "react-router-dom";
import Field from "../components/Field";
import { useAuth } from "../hooks/useAuth";

const Login = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const usernameRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    login(data).then(() => {
      navigate("/dashboard");
    });
    console.clear();
    console.log(JSON.stringify(data, null, 4));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field ref={usernameRef} label="Username:" type="text" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Login;
