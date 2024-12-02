import { useState } from "react";
import { findUser } from "../../services/userService";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import Cookies from 'js-cookie';

export const useLogin = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, email, password) => {
    setLoading(true);
    setMessage("");

    try {
      const data = await findUser({ username, email, password });
      dispatch(login(data));
      
      setMessage(`User found: ${data.userName}`);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, message, loading };
};
