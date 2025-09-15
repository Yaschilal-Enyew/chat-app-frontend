import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [agree, setAgree] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currState === "Sign up" && !agree) {
      alert("You must agree to the terms to continue.");
      return;
    }

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* GLOBAL BLUR GRADIENTS (same as signup.jsx) */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-amber-300 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-80 h-80 bg-yellow-400 rounded-full opacity-16 blur-3xl pointer-events-none" />

      {/* Layout: grid like signup */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-screen items-center">
        
        {/* ILLUSTRATION (same placement style as signup.jsx) */}
        <div className="order-1 md:order-2 flex items-center justify-center p-6">
          <div className="relative w-full max-w-md flex items-center justify-center">
            <div className="absolute -inset-6 md:-inset-10 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 rounded-3xl opacity-10 blur-3xl pointer-events-none" />
        
            <div className="flex flex-col justify-center  items-center gap-5">

            <img src="/logo.svg" className="max-w-40" alt="" />
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              src="/boom.svg"
              alt="Illustration"
              className="relative w-56 sm:w-72 md:w-[420px] rounded-2xl shadow-2xl object-cover"
            /></div>
            
          </div>
        </div>

        {/* LOGIN FORM (styled same as signup form) */}
        <div className="order-2 md:order-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="p-0 md:p-0">
              <div className="md:bg-white/6 md:backdrop-blur-xl md:rounded-2xl md:p-8 md:shadow-2xl md:border md:border-yellow-500/20">
                
                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  
                  <h2 className="text-3xl md:text-4xl font-extrabold text-center md:text-left text-yellow-400 mb-2">
                    {currState === "Sign up" ? "Create an Account" : "Welcome Back"}
                  </h2>
                  <p className="text-sm md:text-base text-gray-300 mb-6 text-center md:text-left">
                    {currState === "Sign up"
                      ? "Join now and chat securely. Fast, private, and premium UI."
                      : "Login to continue your private conversations."}
                  </p>
                </motion.div>

                {/* FORM (kept your logic + fields) */}
                <form onSubmit={onSubmitHandler} className="space-y-4">
                  {currState === "Sign up" && !isDataSubmitted && (
                    <div>
                      <label className="block mb-1 text-xs text-gray-300">Full Name</label>
                      <input
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                        type="text"
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 rounded-md bg-zinc-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                  )}

                  {!isDataSubmitted && (
                    <>
                      <div>
                        <label className="block mb-1 text-xs text-gray-300">Email</label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="email"
                          placeholder="you@example.com"
                          required
                          className="w-full px-4 py-3 rounded-md bg-zinc-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-gray-300">Password</label>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          type="password"
                          placeholder="••••••••"
                          required
                          className="w-full px-4 py-3 rounded-md bg-zinc-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    </>
                  )}

                  {currState === "Sign up" && isDataSubmitted && (
                    <div>
                      <label className="block mb-1 text-xs text-gray-300">Bio</label>
                      <textarea
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        rows={4}
                        placeholder="Provide a short bio..."
                        required
                        className="w-full px-4 py-3 rounded-md bg-zinc-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      ></textarea>
                    </div>
                  )}

                  <button
                    className="w-full py-3 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition shadow-sm hover:shadow-[0_10px_30px_rgba(250,204,21,0.18)]"
                  >
                    {currState === "Sign up" ? "Create Account" : "Login Now"}
                  </button>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      value={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      required
                    />
                    <p>Agree to the terms of use & privacy policy.</p>
                  </div>
                </form>

                {/* Footer links */}
                <div className="mt-4 text-center text-sm text-gray-400">
                  {currState === "Sign up" ? (
                    <p>
                      Already have an account?{" "}
                      <span
                        onClick={() => {
                          setCurrState("Login"); setIsDataSubmitted(false);
                        }}
                        className="text-yellow-400 underline cursor-pointer"
                      >
                        Login here
                      </span>
                    </p>
                  ) : (
                    <div className="flex flex-col gap-3 items-center">
                      <span
                        onClick={() => navigate("/reset-password")}
                        className="text-yellow-400 underline cursor-pointer"
                      >
                        Forgot password?
                      </span>
                      <p>
                        Don’t have an account?{" "}
                        <span
                          onClick={() => setCurrState("Sign up")}
                          className="text-yellow-400 underline cursor-pointer"
                        >
                          Sign up
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
