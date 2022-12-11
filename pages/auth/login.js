import React, {useState} from 'react'
import Image from '@/components/Image'
import {useUser} from '@/hooks/useUser';
import { useRouter } from 'next/router';
import {api} from "../../api"
// const { toast, snackbar } = require('tailwind-toast')

const Login = (props) => {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthentificated, setIsAuthentificated] = useUser()



  const handleLogin = (e) => {
    e.preventDefault()
    

    api.auth().login(userName, password).then((response) => {
      localStorage.setItem("jwt", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      setIsAuthentificated(true)
      router.push("/")

    //   // snackbar().success('Success!', 'You are now logged in').show()
    }).catch((error)=>{
      console.log(error.message)
    //   // snackbar().danger('Login Failed', 'Check your username and password').show()

    })

  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md flex items-center justify-center gap-2">
            <Image width={50} height={50} src="/static/images/logo.png" className="w-full"/>
            <h2 className="my-6 text-center text-3xl font-extrabold text">Sign in</h2>
          </div>
          <form className="space-y-6" onSubmit={(e) =>handleLogin(e)} method="POST">
            <div>
              <div className="isolate -space-y-px rounded-md shadow-sm">
                <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2">
                  <label htmlFor="name" className="block text-xs font-medium text-gray-700 text-left">
                    User name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={e=>setUserName(e.target.value)}
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 sm:text-sm"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2">
                  <label htmlFor="job-title" className="block w-full text-xs font-medium text-gray-700 text-left">
                    Password
                  </label>
                  <input
                    name="job-title"
                    id="job-title"
                    type="password"
                    onChange={e=>setPassword(e.target.value)}
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 sm:text-sm"
                    placeholder="******"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring"
              >
                Sign in
              </button>
            </div>
          </form>
      </div>
      </div>
    </div>
  )
}

export default Login;