"use client";

import { Button } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import logo from "@assets/images/logo.png";
import "@/assets/swal.css";
import logouticon from "@assets/images/logouticon.png";
import Image from "next/image";

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      text: "Are you sure you want to log out?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel",
      imageUrl: logo.src,
      background: "#1C1D1F",
      customClass: {
        popup: "swal2-popup-custom",
        confirmButton: "swal2-confirm-custom",
        cancelButton: "swal2-cancel-custom",
        image: "logo",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Cookies.remove("access-token");
        Swal.fire({
          title: "",
          text: "Logged out successfully.",
          icon: "success",
          background: "#111514",
          color: "#FFFFFF",
          customClass: {
            popup: "swal2-popup-custom",
            confirmButton: "swal2-confirm-custom",
          },
          showConfirmButton: false,
          timer: 1000,
        });

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    });
  };

  return (
    <Button
      sx={{
        background: "transparent",
        color: "red",
        textTransform: "capitalize",
      }}
      startIcon={
        <Image
          src={logouticon}
          alt="Logout"
          style={{ width: 15, height: 15 }}
        />
      }
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
