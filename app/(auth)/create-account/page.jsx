"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Api from "@/app/_utils/Api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onCreateAccount = () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    Api.registerUser(username, email, password)
      .then((resp) => {
        const data = resp.data;
        if (data && data.user && data.jwt) {
          localStorage.setItem("user" , JSON.stringify(data.user))
        localStorage.setItem("jwt" , data.jwt);

          console.log("User:", data.user);
          console.log("JWT:", data.jwt);
          toast("Account created successfully!");
          router.push("/");
        } else {
          toast("Unexpected response from server");
        }
      })
      .catch((err) => {
        toast("Error while created.");
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    const user = localStorage.getItem("user")

    if (jwt && user) {
      router.push("/")
    } else if (jwt || user) {
      // Partially stale session, clear it
      localStorage.clear()
    }
  }, []);

  return (
    <div className="items-baseline flex m-20 justify-center">
      <div className="flex flex-col items-center bg-gray-100 w-100 p-5">
        <Image src="/logo.png" width={200} height={200} alt="logo" />
        <h2 className="m-5 text-gray-500">Create New Account</h2>
        <div className="flex flex-col w-full gap-5">
          <Input
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white"
            type="text"
            placeholder="Username"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white"
            type="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white"
            type="password"
            placeholder="Password"
          />
          <Button
            disabled={!(username && email && password)}
            onClick={onCreateAccount}
          >
            Create new account
          </Button>

          <p>
            Already Have an Account?{" "}
            <Link className="text-blue-500" href={"/sign-in"}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
