import { User, Lock, UserCircle, Envelope } from "phosphor-react";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleSignup = async () => {
    try {

      const userDetails = {
        username,
        email,
        password,
        retypePassword
      };
      const { data } = await axios.post(
        `/api/users`,
        userDetails
      );

      if (!data?.success) {
        console.log("error");
        return;
      }
      else{
        console.log('has been registered!')
      }

    } catch (error) {
      console.log("error");
    } finally {
      // setLoading(false);
    }
  };


  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white h-fit px-5 py-8 rounded-2xl w-1/3">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-full items-center">
            <UserCircle size={34} />
            <p className="text-3xl">Sign Up</p>
          </div>
          <p className="text-sm">Please fill the form below</p>
          <div className="flex flex-col gap-2 mt-3 mb-3">
            <Input
              text="Username"
              type="text"
              widthFull
              onChange={(v) => setUsername(v)}
              value={username}
              Icon={User}
            />
            <Input
              text="Email"
              type="email"
              widthFull
              onChange={(v) => setEmail(v)}
              value={email}
              Icon={Envelope}
            />
            <Input
              text="Password"
              type="password"
              widthFull
              onChange={(v) => setPassword(v)}
              value={password}
              Icon={Lock}
            />
            <Input
              text="Retype Password"
              type="password"
              widthFull
              onChange={(v) => setRetypePassword(v)}
              value={retypePassword}
              Icon={Lock}
            />
            <p className="underline cursor-pointer text-xs text-right float-right">
              Forgot password?
            </p>
          </div>

          <Button widthFull onClick={handleSignup}>
            Sign in
          </Button>

          <div className="text-sm flex justify-center gap-1">
            <span>Already have an account?</span>
            <span
              className="underline cursor-pointer font-medium"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Login now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
