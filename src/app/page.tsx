"use client"
import Image from "next/image";
import { useRef, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true)

  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");

  const {login: loginUser, register: registerUser} = useAuth();

  const handleSubmit = async () => {
    if(!emailRef.current || !passwordRef.current) {
      alert("Porfavor completa todos los campos");
      return;
    }

    setIsLoading(true)
    const res = await loginUser(emailRef.current, passwordRef.current)
    setIsLoading(false)
    if(!res.success) {
      alert(res.msg)
    }
  }

  const handleRegister = async () => {
    if(!emailRef.current || !passwordRef.current || !nameRef.current) {
      alert("Porfavor completa todos los campos");
      return;
    }

    setIsLoading(true)
    const res = await registerUser(emailRef.current, passwordRef.current, nameRef.current, usernameRef.current)
    setIsLoading(false)
    if(!res.success) {
      alert(res.msg)
    }
  }

  return (
    <>
      <main className="flex w-[100%] h-[100vh]">
        <section className="flex bg-green-400 flex-1 justify-center items-center min-h-screen p-4">
          <Card className="w-full max-w-md rounded-3xl shadow-lg relative">
            <div className="flex justify-between absolute w-full align-top -top-1 h-[49px] border-b border-gray-200">
              <button className={`${isLogin ? "bg-[#fe8a54]" : ""} flex-1 cursor-pointer rounded-tl-[20px]`} onClick={() => setIsLogin(!isLogin)}>Iniciar Sesión</button>
              <button className={`${!isLogin ? "bg-[#fe8a54]" : ""} flex-1 cursor-pointer rounded-tr-[20px]`} onClick={() => setIsLogin(!isLogin)}>Registrarme</button>
            </div>
              <Image 
                src='/logoStackbook.png'
                alt="logo"
                className="absolute -top-12 rounded-full right-[40%]"
                width={100}
                height={100}
              />
            <CardHeader className="pb-0 pt-10">
              <CardTitle className="text-center text-2xl font-semibold">
                {isLogin ? "Bienvenido" : "Comencemos"}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 mt-2">
              {isLogin ? 
                <>
                  <Input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => (emailRef.current = e.target.value)}
                  />
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    onChange={(e) => (passwordRef.current = e.target.value)}
                  />
                  <Button disabled={isLoading} variant="default" onClick={handleSubmit}>
                    Iniciar Sesión 
                  </Button>
                </>
              :
              <>
                <Input placeholder="Nombre" type="text" onChange={(e) => (nameRef.current = e.target.value)}/>
                <Input placeholder="Usuario" type="text" onChange={(e) => (usernameRef.current = e.target.value)}/>
                <Input placeholder="Email" type="email" onChange={(e) => (emailRef.current = e.target.value)}/>
                <Input placeholder="Contraseña" type="password" onChange={(e) => (passwordRef.current = e.target.value)}/>
                <Button disabled={isLoading} variant="default" onClick={handleRegister}>Registrarme</Button>
              </>
              }
            </CardContent>
          </Card>
        </section>
      </main>

    </>
  );
}
