import { SignIn, User, Lock } from "phosphor-react";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginData,
  setLoginData,
  setAccessToken,
  setUserData,
} from "../../redux/userSlice";
import axios from "../../api/axios";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let { email, password } = useSelector(selectLoginData);

  console.log(email)
  console.log(password)
 
  const [loading, setLoading] = useState(false);

  // handle inputs
  const setValue = useCallback((type: string, data: any) => {
    dispatch(setLoginData({ type, data }));
  }, []);

  const [error, setError] = useState("");

  // login
  const handleLogin = async () => {
    try {
      // // reset errors
      // dispatch(
      //   setLoginData({
      //     type: 'error',
      //     data: {message: '', type: ''},
      //   }),
      // );

      setLoading(true);
      setError('')

      let userData = { email, password };
      if(!email){
        email = 'test@gmail.com'
      }
      if(!password){
        password = 'test'
      }

      const { data } = await axios.post(`/api/auth/login`, userData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          credentials: 'include'
        },
      });

      if (!data?.success) {
        data?.message ? setError(data?.message) : setError('error')
        return;
      }

      dispatch(
        setLoginData({
          type: "reset",
        })
      );
      dispatch(
        setAccessToken({
          type: "token",
          data: data?.accessToken,
        })
      );

      localStorage.setItem("token", data?.accessToken);

      dispatch(
        setUserData({
          type: "user",
          data: data?.userData,
        })
      );

      navigate("/");
    } catch (error) {
      console.log("error");
      setError('error')
      // handleError(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

    // clean up
    useEffect(() => {
      return () => {
        dispatch(
          setLoginData({
            type: "reset",
          })
        );
      };
    }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white h-fit px-5 py-8 rounded-2xl w-1/3  min-w-[400px]">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-full items-center">
            <SignIn size={34} />
            <p className="text-3xl">Sign In</p>
          </div>
          <p className="text-sm text-gray-500">Hi, I'm still working on this web, feel free to test it</p>
          <p className="text-sm font-medium text-green-500">Please use these data for test</p>
          <div className="flex gap-2">
            <p className="text-sm">email:</p>
            <p className="text-sm">test@gmail.com</p>
          </div>
          <div className="flex gap-2">
            <p className="text-sm">pass:</p>
            <p className="text-sm">test</p>
          </div>
          {error.length ? (
            <div className="text-red-500 flex justify-center font-medium">
              <p>Information are incorrect</p>
            </div>
          )  : null
        }
          <div className="flex flex-col gap-2 mt-3 mb-3">
            <Input
              text="Email address"
              type="email"
              widthFull
              onChange={(v) => setValue("email", v)}
              value={email}
              Icon={User}
            />
            <Input
              text="Password"
              type="password"
              widthFull
              onChange={(v) => setValue("password", v)}
              value={password}
              Icon={Lock}
            />
            <p className="underline cursor-pointer text-xs text-right float-right">
              Forgot password?
            </p>
          </div>

          {
            loading ?
              <Button widthFull loading onClick={handleLogin}>
                Sign in
              </Button>
              : <Button widthFull onClick={handleLogin}>
                Sign in
              </Button>

          }

          <div className="text-sm flex justify-center gap-1">
            <span>Don't have an account?</span>
            <span
              className="underline cursor-pointer font-medium"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
