import Input from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("Login");
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "Login" ? "Register" : "Login"
    );
  }, []);
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", { email, name, password });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [name, email, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "Login" ? "Sign in" : "Register"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === "Register" && (
                  <Input
                    label="Username"
                    onChange={(event: any) => setName(event.target.value)}
                    id="name"
                    value={name}
                  />
                )}

                <Input
                  label="Email"
                  onChange={(event: any) => setEmail(event.target.value)}
                  id="email"
                  value={email}
                  type="email"
                />
                <Input
                  label="Password"
                  onChange={(event: any) => setPassword(event.target.value)}
                  id="password"
                  value={password}
                  type="password"
                />
              </div>
              <button
                onClick={variant === "Login" ? login : register}
                className="bg-red-600 py-3 text-white font-semibold rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === "Login" ? "Login" : "sign up"}
              </button>
              <div
                onClick={() => signIn("google", { callbackUrl: "/profile" })}
                className="flex items-center justify-center gap-4 mt-8"
              >
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: "/profile" })}
                  className="h-10 w-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FaGithub size={30} />
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === "Login"
                  ? "First time using netflix?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "Login" ? "Create an account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Auth;
