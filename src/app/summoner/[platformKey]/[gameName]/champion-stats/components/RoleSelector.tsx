"use client";
import { useDropDown } from "@/hooks/useDropdown";
import { roleMap } from "@/lib/maps/roleMap";
import { RoleType } from "@/types/summoner";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface RoleSelectorProps {
  currentRole: RoleType | "all";
  setCurrentRole: Dispatch<SetStateAction<RoleType | "all">>;
}

export default function RoleSelector({
  currentRole,
  setCurrentRole,
}: RoleSelectorProps) {
  const { open, setOpen, ref } = useDropDown();

  return (
    <div
      ref={ref}
      className="relative text-sm lg:text-base z-1 max-h-5 lg:max-h-fit"
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="w-25">
          {currentRole === "all" ? (
            <div className="flex items-center justify-between">
              <div className="relative size-5">
                <Image src={"/Role_Icons/Role=Top.png"} fill alt="role icon" />
                <Image src={"/Role_Icons/Role=Bot.png"} fill alt="role icon" />
              </div>
              <p>All Roles</p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <Image
                src={roleMap[currentRole].icon}
                width={20}
                height={20}
                alt="role icon"
              />
              <p>{roleMap[currentRole].label}</p>
            </div>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-5 transition-transform duration-200 ease ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {open && (
        <div className="absolute bg-accent rounded-md top-7.5 lg:top-9 right-5 cursor-pointer text-sm overflow-hidden w-25">
          <div
            className={`${
              currentRole === "all" ? "bg-subtle/15" : ""
            } p-2 hover:bg-subtle/15 flex items-center justify-between`}
            onClick={() => {
              setCurrentRole("all");
              setOpen(!open);
            }}
          >
            <div className="relative size-5">
              <Image src={"/Role_Icons/Role=Top.png"} fill alt="role icon" />
              <Image src={"/Role_Icons/Role=Bot.png"} fill alt="role icon" />
            </div>
            <p>All Roles</p>
          </div>
          {Object.entries(roleMap)
            .filter(([role]) => role !== "Unknown")
            .map(([role, { label, icon }]) => {
              return (
                <div
                  key={role}
                  className={`${
                    currentRole === role ? "bg-subtle/15" : ""
                  }  hover:bg-subtle/15 px-2 flex items-center justify-between min-h-9`}
                  onClick={() => {
                    setCurrentRole(role as RoleType);
                    setOpen(!open);
                  }}
                >
                  <Image src={icon} alt="role icon" width={20} height={20} />
                  <p>{label}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
