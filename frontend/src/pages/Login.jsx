import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.auth);

  return (
    <div>
      <h2>Login</h2>
      <input
        className="border border-black px-1.5 py-1 rounded-md"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br />
      <br />
      <input
        className="border border-black px-1.5 py-1 rounded-md"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br />
      <br />

      {!loading ? (
        <button
          className="border border-blue-500 rounded-md p-2 bg-blue-500"
          onClick={() => dispatch(login(form))}
        >
          Submit
        </button>
      ) : (
        <button
          className="border border-blue-500 rounded-md p-2 bg-blue-500"
          onClick={() => dispatch(login(form))}
        >
          Loading...
        </button>
      )}
    </div>
  );
};

export default Login;
