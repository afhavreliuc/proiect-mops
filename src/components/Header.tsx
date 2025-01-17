"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/lib/features/AuthSlice";
import { AppDispatch, RootState } from "@/lib/store";
import React from "react";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <div className="h-28 w-full flex items-center bg-schwarzwald-green px-4 relative">
      <div className="absolute left-4 flex space-x-4">
        <Link href="/disks" className="text-white">
          Disks
        </Link>
        {currentUser ? (
          <>
            <span className="text-white">Welcome, {currentUser.displayName || currentUser.email}</span>
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
      <div className="flex-1 flex justify-center">
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
    </div>
  );
};

export default Header;
