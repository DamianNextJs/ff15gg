"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function DeleteAccountModal() {
  const [open, setOpen] = useState(false);
  const [verifyInput, setVerifyInput] = useState("");

  const verifyText = "delete my account";

  const verifyMatch = verifyInput === verifyText;

  const handleClick = () => {
    console.log("deleted account");
    setOpen(false);
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
