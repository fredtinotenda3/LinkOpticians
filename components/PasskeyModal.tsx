// ===== FILE: components/PasskeyModal.tsx (REPLACEMENT) =====
"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { verifyAdminPasskey } from "@/app/admin/actions";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

const PasskeyModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated via cookie
    const checkAuth = async () => {
      const res = await fetch("/api/admin/check");
      const data = await res.json();
      if (data.authenticated) {
        router.push("/admin");
      } else {
        setOpen(true);
      }
    };
    checkAuth();
  }, [router]);

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("passkey", passkey);
    
    const result = await verifyAdminPasskey(formData);
    
    if (result.success) {
      setOpen(false);
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid passkey. Please try again.");
    }
    
    setIsLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validatePasskey}
            className="shad-primary-btn w-full"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Enter Admin Passkey"}
          </AlertDialogAction>
        </AlertDialogFooter>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;