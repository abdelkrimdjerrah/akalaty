import { SignIn, User, Lock } from "phosphor-react"
import Input from "../../shared/Input"
import Button from "../../shared/Button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(false)

  const handleSignin = () => {
    console.log("username: "+ username)
    console.log("password: "+ password)
    if( username !== 'a' && password !== 'a' ){
        setError(true) 
    }else{
        navigate('/')
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white h-fit px-5 py-8 rounded-2xl w-1/3">

            <div className="flex flex-col gap-2">
                <div className='flex gap-2 w-full items-center'>
                    <SignIn size={34}/>
                    <p className='text-3xl'>Sign In</p>
                </div>
                <p className="text-sm">Please fill the form below</p>
                {
                    error && (
                        <div className="text-red-500 flex justify-center font-medium">
                            <p>Information are incorrect</p>
                        </div>
                    )
                }
                <div className="flex flex-col gap-2 mt-3 mb-3">
                    <Input
                        text="Username"
                        type="email"
                        widthFull
                        onChange={(v) => setUsername(v)}
                        value={username}
                        Icon={User}
                    />
                    <Input
                        text="Password"
                        type="password"
                        widthFull
                        onChange={(v) => setPassword(v)}
                        value={password}
                        Icon={Lock}
                    />
                    <p className="underline cursor-pointer text-xs text-right float-right">Forgot password?</p>
                </div>

                <Button
                    widthFull
                    onClick={handleSignin}
                >
                    Sign in
                </Button>

                <div className="text-sm flex justify-center gap-1">
                    <span>Don't have an account?</span>
                    <span 
                        className="underline cursor-pointer font-medium"
                        onClick={()=>{navigate('/signup')}}
                    >
                        Create account
                    </span>
                </div>

            </div>
            
        </div>
    </div>
  )
}

export default Login