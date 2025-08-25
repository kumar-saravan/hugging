"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import back from "@assets/images/log-back.jpg";
import "@/assets/swal.css";
const VerifyPage = () => {
  const { token } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      verifyEmail(token as string);
    }
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const res = await fetch(
        `https://backend-kumar.simbli.ai/api/v1/verify/${token}`,
        {
          method: "GET",
        }
      );

      if (res.ok) {
        Swal.fire({
          title: "Verified!",
          text: "Your email has been successfully verified.",
          icon: "success",
          confirmButtonText: "Login",
          color: "#FFFFFF",
          background: "#1C1D1F",
          customClass: {
            popup: "swal2-popup-custom",
            confirmButton: "swal2-confirm-custom",
            image: "logo",
          },
        }).then(() => {
          router.push("/login");
        });
      } else {
        Swal.fire({
          title: "Verification Failed",
          text: "Invalid or expired verification link.",
          icon: "error",
          confirmButtonText: "OK",
          background: "#1C1D1F",
          customClass: {
            popup: "swal2-popup-custom",
            confirmButton: "swal2-confirm-custom",

            image: "logo",
          },
        });
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        background: "#1C1D1F",
        color: "#FFFFFF",
        confirmButtonColor: "#7DDD7D",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="hero"
        style={{
          backgroundImage: `url(${back})`,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <p style={{ color: "#7DDD7D", fontSize: "18px" }}>
          {/* Verifying your email... */}
        </p>
      </div>
    );
  }

  return null;
};

export default VerifyPage;
