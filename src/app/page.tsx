"use client";
import AuthScreen from "./auth/component/AuthScreen";
import {Authenticated, Unauthenticated} from "convex/react";

export default function Home() {
  return (
    <div className=" w-full h-full  flex flex-col max-w-7xl mx-auto justify-center items-center gap-4 bg-blue-500 ">
      {/* <h1 className="text-6xl font-bold">UniCollab</h1>
      <AuthScreen /> */}
    </div>
  );
}
