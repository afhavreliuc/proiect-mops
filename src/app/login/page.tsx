"use client";

import TextInput from "@/components/common/Input";
import { login, signInWithGoogle } from "@/lib/features/AuthSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import Notification from '../../components/common/Notification';
import React, {useState} from "react";
import LoadingSpinner from '../../components/common/LoadingSpinner'


const LoginPage = () => {
  const { currentUser, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await dispatch(login({ email, password }));
    if (result.type === 'auth/login/rejected') {
      setNotification({ message: result.payload as string, type: 'error' });
    }
  };

  const handleGoogleLogin = async () => {
    await dispatch(signInWithGoogle());
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return (
    <div className="flex-1 w-full flex justify-center items-center">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <form
        onSubmit={handleLogin}
        className="relative bg-schwarzwald-green p-10 bg-opacity-80 text-white font-extralight justify-normal flex flex-col gap-8"
      >
        <div className="text-6xl">Welcome to Vaultone</div>
        <div className="w-full flex justify-center">
          <div className="font-thin text-4xl">Log In to continue.</div>
        </div>

        <TextInput
          name="email"
          required
          style="w-full"
          type={"email"}
          placeholder="Email address"
        />
        <TextInput
          required
          name="password"
          style="w-full"
          type={"password"}
          placeholder="Password"
        />
        {/* <div>
          <button className="underline font-normal text-xl">
            Forgot Password?
          </button>
        </div> */}

        <button 
          type="submit" 
          disabled={loading}
          className={`font-normal text-xl bg-black h-12 flex justify-center items-center ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? <LoadingSpinner /> : 'Continue'}
        </button>

        <div className="text-xl font-normal">
          Don't have an account?{" "}
          <span className="underline">
            <a href="/signup">Sign Up</a>
          </span>
        </div>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px bg-white bg-opacity-80 border-0" />
          <span className="px-4 text-lg">OR</span>
          <hr className="w-full h-px bg-white bg-opacity-80 border-0" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`px-2 font-normal text-xl border h-12 flex justify-between items-center ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <FontAwesomeIcon icon={faGoogle} className="h-6 w-6" />
              <span>Continue With Google</span>
              <span></span>
            </>
          )}
        </button>

        <Image
          className="absolute z-[-10] left-[280px]"
          src="/bg-disk.png"
          alt="Background Image"
          width={700}
          height={700}
          priority
        />
      </form>
    </div>
  );
};

export default LoginPage;
