"use client";

import TextInput from "@/components/common/Input";
import { signInWithGoogle, signUp } from "@/lib/features/AuthSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await dispatch(
      signUp({ displayName: name, email, password })
    );
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
      <form
        onSubmit={handleLogin}
        className="relative bg-schwarzwald-green p-10 bg-opacity-80 text-white font-extralight justify-normal flex flex-col gap-8"
      >
        <div className="text-6xl">Welcome to Vaultone</div>
        <div className="w-full flex justify-center">
          <div className="font-thin text-4xl">Sign Up to continue.</div>
        </div>

        <TextInput
          name="name"
          required
          style="w-full"
          type={"text"}
          placeholder="Full Name"
        />

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

        <button type="submit" className="font-normal text-xl bg-black h-12">
          Continue
        </button>

        <div className="text-xl font-normal">
          Already have an account?{" "}
          <span className="underline">
            <a href="/login">Log In</a>
          </span>
        </div>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px bg-white bg-opacity-80 border-0" />
          <span className="px-4 text-lg">OR</span>
          <hr className="w-full h-px bg-white bg-opacity-80 border-0" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="px-2 font-normal text-xl border h-12 flex justify-between items-center"
        >
          <FontAwesomeIcon icon={faGoogle} className="h-6 w-6" />
          <span>Continue With Google</span>
          <span></span>
        </button>

        <Image
          className="absolute z-[-10] right-[280px]"
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

export default SignupPage;
