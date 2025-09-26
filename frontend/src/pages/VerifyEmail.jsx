import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { verify } from "../features/auth/authSlice";

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.auth);

  if (token) {
    dispatch(verify(token));
  }

  console.log(token);

  return <div>please wait while verify your email</div>;
};

export default VerifyEmail;
