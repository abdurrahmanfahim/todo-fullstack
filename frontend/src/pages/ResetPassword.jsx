import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../features/auth/authSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const [form, setForm] = useState({
    password: "",
  });

  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.auth);

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        className="border border-black px-1.5 py-1 rounded-md"
        type="text"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br />
      <br />

      <button
        className="border border-blue-500 rounded-md p-2 bg-blue-500"
        onClick={() => dispatch(resetPassword({ token, form }))}
      >
        Submit
      </button>
    </div>
  );
};

export default ResetPassword;
