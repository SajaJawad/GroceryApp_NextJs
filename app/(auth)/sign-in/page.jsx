"use client"
import Api from '@/app/_utils/Api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'




function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()


  const onSignIn = () => {
    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    Api.signIn(email, password)
      .then(resp => {
        const data = resp.data
        if (data && data.user && data.jwt) {
          localStorage.setItem("user", JSON.stringify(data.user))
          localStorage.setItem("jwt", data.jwt)

          console.log("User:", data.user)
          console.log("JWT:", data.jwt)
          toast("Signed in successfully!")
          router.push("/")
        } else {
          toast("Unexpected response from server")
        }
      })
      .catch(err => {
        toast("Error while signing in.")
      })
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    const user = localStorage.getItem("user")

    if (jwt && user) {
      router.push("/")
    } else if (jwt || user) {
      // Partially stale session, clear it
      localStorage.clear()
    }
  }, [])

  return (
    <div className='items-baseline flex m-20 justify-center'>
      <div className='flex flex-col items-center bg-gray-100 w-100 p-5'>
        <Image src="/logo.png" width={200} height={200} alt='logo' />
        <h2 className='m-5 text-gray-500'>Sign In</h2>
        <div className='flex flex-col w-full gap-5'>
          <Input onChange={(e) => setEmail(e.target.value)} className="bg-white" type="email" placeholder="Email" />
          <Input onChange={(e) => setPassword(e.target.value)} className="bg-white" type="password" placeholder="Password" />
          <Button disabled={!(email && password)} onClick={onSignIn}>Sign In</Button>

          <p>Don't Have an Account? <Link className='text-blue-500' href={"/create-account"}>Create new Account.</Link></p>

        </div>
      </div>
    </div>

  )
}

export default SignIn