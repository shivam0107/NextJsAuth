'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {

    const router = useRouter();


    const [user , setUser] = useState({
      email:"",
      password:"",
    })

    const [buttonDisabeled , setButtonDisabeled] = useState(false);
    const [loading , setloading] = useState(false);

    const onLogin = async () => {
      try {
        setloading(true);
       const response = await   axios.post("/api/users/login" , user);
       console.log("login success" , response.data);
       
       router.push('/profile')

      } catch (error: any) {
        console.log("login failed");
        toast.error(error.message)
      }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 ){
          setButtonDisabeled(false);
        }
        else{
          setButtonDisabeled(true);
          
        }
    },[user])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading ? "Processing" : "Login"}</h1>
    <hr />
    <label htmlFor="email">email</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focu s:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        />
    <label htmlFor="password">password</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
        />
        <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabeled ? "No login" : "login"}</button>
        <Link href="/signup">Visit signup page</Link>
    </div>
  )
}

export default LoginPage