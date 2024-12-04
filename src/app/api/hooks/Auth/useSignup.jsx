import { useState } from "react";
import { createUser } from "../../services/userService";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";

export const useSignup = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      const data = await createUser(formData);
      console.log(data);
      dispatch(login(data));
      toast({
        title: "Signup Successful!",
        description: "You have successfully signed up.",
      });
      router.push("/");
      setMessage(`User signed up: ${data.userName}`);
    } catch (error) {
      setMessage(error.message);
      toast({
        title: "Signup Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, message, loading };
};
