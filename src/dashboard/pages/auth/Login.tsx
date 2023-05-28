import { SignIn, User, Lock } from "phosphor-react";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, selectLoginData, selectUser, selectUserData, selectToken, setLoginData, loginUser, setAccessToken,setUserData } from "../../redux/userSlice";
import axios from "../../api/axios";


function Login() {

  const dispatch = useDispatch();
 
  const navigate = useNavigate();

  const {email, password} = useSelector(selectLoginData);

  const [loading, setLoading] = useState(false);
  

  // handle inputs
  const setValue = useCallback((type:string, data:any) => {
    dispatch(setLoginData({type, data}));
  }, []);

  const [error, setError] = useState(false);

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

      const userData = {email, password};

      const {data} = await axios.post(
          `/api/auth/login`,
          userData,
          {
            headers: {
              'Content-Type': 'application/json',
              'withCredentials': 'true'
          }
          }
        );

      if (!data?.success) {
        console.log('error?')
        console.log(data.message)
        return;
      }

      console.log("This is data")
      console.log(data)
      console.log("This is data")

      // reset data
      dispatch(
        setLoginData({
          type: 'reset'
        }),
      );
      // save the token
      dispatch(
        setAccessToken({
          type: 'token',
          data: data?.accessToken,
        }),
      );

      // save the user data
      dispatch(
        setUserData({
          type: 'user',
          data: data?.userData,
        }),
      );

      navigate('/')
      
 




    } catch (error) {
      console.log('error')
      // handleError(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };
  // clean up
  // useEffect(() => {
  //   return () => {
  //     dispatch(
  //       setLoginData({
  //         type: 'error',
  //         data: {message: '', type: ''},
  //       }),
  //     );
  //   };
  // }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white h-fit px-5 py-8 rounded-2xl w-1/3">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-full items-center">
            <SignIn size={34} />
            <p className="text-3xl">Sign In</p>
          </div>
          <p className="text-sm">Please fill the form below</p>
          {error && (
            <div className="text-red-500 flex justify-center font-medium">
              <p>Information are incorrect</p>
            </div>
          )}
          <div className="flex flex-col gap-2 mt-3 mb-3">
            <Input
              text="Email address"
              type="email"
              widthFull
              onChange={(v) => setValue('email',v)}
              value={email}
              Icon={User}
            />
            <Input
              text="Password"
              type="password"
              widthFull
              onChange={(v) => setValue('password',v)}
              value={password}
              Icon={Lock}
            />
            <p className="underline cursor-pointer text-xs text-right float-right">
              Forgot password?
            </p>
          </div>

          <Button widthFull onClick={handleLogin}>
            Sign in
          </Button>

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
