"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useUser } from "@/features/auth/context/UserContext";
import { useState } from "react";
import { DeleteUser } from "../lib/actions";
import { signOut } from "next-auth/react";

export default function DeleteAccountModal() {
  const [open, setOpen] = useState(false);
  const [verifyInput, setVerifyInput] = useState("");
  const { user } = useUser();

  const verifyText = "delete my account";

  const verifyMatch = verifyInput === verifyText;

  const handleClick = async () => {
    setOpen(false);
    if (!user?._id) return;

    const result = await DeleteUser(user._id);
    if (result) {
      setVerifyInput("");
      signOut({ callbackUrl: "/" });
    }
  };

  return (
    <>
      <Button color={"bg-red-500"} onClick={() => setOpen(true)}>
        Delete your Account
      </Button>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setVerifyInput("");
        }}
        title="Are you sure you want to do this?"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            To verify, type &apos;<i>{verifyText}</i>&apos; exactly as it
            appears:
          </label>
          <input
            type="text"
            onChange={(e) => setVerifyInput(e.target.value)}
            value={verifyInput}
            className="bg-accent p-1 rounded-md border-subtle/50 border focus:outline-none focus:border-primary"
          />
        </div>
        <Button
          color={"bg-red-500"}
          disabled={!verifyMatch}
          onClick={handleClick}
        >
          Yes, delete my account
        </Button>
      </Modal>
    </>
  );
}
