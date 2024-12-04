import { useState } from "react";
import { findUser } from "../../services/userService";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";

export const useLogin = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast()

  const handleLogin = async (username, email, password) => {
    setLoading(true);
    setMessage("");

    try {
      const data = await findUser({ username, email, password });
      dispatch(login(data));
      // toast("Login Successfull!!!");
      toast({
        title: "Login Successfull!!!",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
      router.push("/");
      window.location.reload()
      setMessage(`User found: ${data.userName}`);
    } catch (error) {
      setMessage(error.message);
      // toast("UnSuccessfull!!!");
      toast({
        title: "Login UnSuccessfull!!!",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, message, loading };
};
