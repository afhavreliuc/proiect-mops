"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/lib/features/AuthSlice";
import { AppDispatch, RootState } from "@/lib/store";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <div className="h-28 w-full flex items-center justify-between bg-schwarzwald-green px-4">
      <div className="flex space-x-4">
        {currentUser ? (
          <>
            <span className="text-white">Welcome, {currentUser.displayName || currentUser.email}</span>
            <Link href="/disks" className="text-white">
              Disks
            </Link>
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-white">
              Login
            </Link>
            <Link href="/signup" className="text-white">
              Sign Up
            </Link>
          </>
        )}
      </div>
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Vaultone logo"
          width={271}
          height={36}
          priority
        />
      </Link>
    </div>
  );
};

export default Header;
