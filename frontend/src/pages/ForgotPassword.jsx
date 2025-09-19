import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/auth/authSlice";

const ForgotPassword = () => {

    const [form, setForm] = useState({
    email: ""
  });



  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.auth);

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        className="border border-black px-1.5 py-1 rounded-md"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br />
      <br />

        <button
          className="border border-blue-500 rounded-md p-2 bg-blue-500"
          onClick={() => dispatch(forgotPassword(form))}
        >
          Submit
        </button>
      
    </div>
  );
}

export default ForgotPassword