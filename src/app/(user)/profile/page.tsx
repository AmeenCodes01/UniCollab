"use client";
import React, {useEffect, useState} from "react";

import {Input} from "@/components/ui/input";
import {useAction, useMutation, useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

// email, name, year, course. simple
function profile() {
  //user can change/add details here.
const user = useQuery(api.users.current);
  const update = useMutation(api.users.update);
  const [email, setEmail] = useState(user?.email ?? "");
  const [year, setYear] = useState(user?.year ?? "");
  const [course, setCourse] = useState(user?.course ?? "");
  const [displayName, SetDisplayName] = useState(user?.displayName ?? "");
  const [edit, setEdit] = useState(false);
  console.log(user, "user in profile");

  useEffect(() => {
    setEmail(user?.email ?? "");
    setYear(user?.year ?? "");
    setCourse(user?.course ?? "");
    SetDisplayName(user?.displayName ?? "")
  }, [user]);

  const onEditSave = () => {
    setEdit((prev) => {
      //save user
      if (prev && year !== "" && course !== "") {
        //saving
        const data = {
          course,
          year: parseInt(year as string),
           displayName
        };
        update({data});
      }
      return !prev;
    });
  };

  return (
    <div className="w-full  flex gap-4 flex-col justify-center items-center">
      <h1 className="font-bold text-2xl self-start">Profile</h1>
      <div  className="w-[500px] flex gap-4 flex-col">

      <div className="flex flex-col gap-2">

        <Label>Email</Label>
        <Input disabled={true} value={email} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Display Name</Label>
        <Input
          value={displayName}
          onChange={(e) => SetDisplayName(e.target.value)}
          disabled={!edit}
          />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Year</Label>
        <Input
          type="number"
          value={year}
          min={1}
          max={5}
          onChange={(e) => setYear(e.target.value)}
          disabled={!edit}
          />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Course</Label>
        <Input
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          disabled={!edit}
          />
      </div>
    
      <Button className={`ml-auto `} onClick={onEditSave}>{!edit ? "Edit" : "Save"}</Button>
</div>
          <SignOutButton>
            <Button variant={"secondary"}>
Sign out
            </Button>
            </SignOutButton>
          
    </div>
  );
}

export default profile;


//${edit ?"bg-green-300 w-full transition-[width] duration-100":null}