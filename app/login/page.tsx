"use client";
import React, { useState, useCallback } from "react";
import "@/assets/login.css";
import logo from "@assets/images/logo.png";
import soc1 from "@assets/images/youtube.png";
import soc2 from "@assets/images/twitter.png";
import soc3 from "@assets/images/insta.png";
import soc4 from "@assets/images/facebook.png";
import soc5 from "@assets/images/linkedin.png";
import soc6 from "@assets/images/gt.png";
import kumar from "@assets/images/kumar.png";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Image from "next/image";

// Alert Component
const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isSignupMode, setIsSignupMode] = useState(false); // 🔹 New state

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password: string): boolean => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Input Name: ${name}, Value: ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 1️⃣ Modify the validateForm function
  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.email) {
      errors.push("Email is required.");
    } else if (!validateEmail(formData.email)) {
      errors.push("Please enter a valid email.");
    }

    if (!formData.password) {
      errors.push("Password is required.");
    } else if (!validatePassword(formData.password)) {
      errors.push(
        "Password must be 8+ chars with uppercase, lowercase, and a number."
      );
    }

    // Add validation for username on signup mode
    if (isSignupMode && !formData.username) {
      errors.push("Username is required.");
    }

    return errors;
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info");

  const showSnackbar = useCallback(
    (message: string, severity: AlertColor = "info") => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    },
    []
  );

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (formErrors.length > 0) {
      // 💡 Display the first error in the snackbar and return
      showSnackbar(formErrors[0], "error");
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch("https://backend-kumar.simbli.ai/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const decodedToken = jwtDecode(data.token) as { email: string };
        Cookies.set("access-token", data.token);
        localStorage.setItem("mail", decodedToken.email);

        showSnackbar("Login successful!", "success");
        router.push("/projects/new");
      } else {
        const errorData = await res.json();
        showSnackbar(errorData.message || "Login failed", "error");
      }
    } catch (error) {
      showSnackbar("An error occurred. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      showSnackbar("Please fix the errors in the form", "error");
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://backend-kumar.simbli.ai/api/v1/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            username: formData.username,
          }),
        }
      );

      if (res.status === 200 || res.status === 201) {
        setIsSignupMode(false);
        showSnackbar(
          "Signup successful! Please check your email for verification.",
          "success"
        );
      } else {
        const errorData = await res.json();
        showSnackbar(errorData.message || "Signup failed", "error");
      }
    } catch (error) {
      showSnackbar(
        "An error occurred during signup. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />
      <div className="container-fluid px-4 px-lg-0 hero overflow-hidden">
        <div className="container top-nv d-flex justify-content-between py-4 px-4 px-lg-0">
          <Image
            src={logo}
            alt="Logo"
            width={153}
            height={40}
            className="logo"
          />
          <div className="d-flex gap-3">
            {/* Youtube */}
            <a
              href="https://www.youtube.com/@Simbli-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={soc1} className="nv-icon-soc" alt="social" />
            </a>
            {/* Twitter */}
            <a
              href="https://x.com/Simbli_ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={soc2} className="nv-icon-soc" alt="social" />
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/simbli.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={soc3} className="nv-icon-soc" alt="social" />
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/SimbliAi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={soc4} className="nv-icon-soc" alt="social" />
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/simbliai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={soc5} className="nv-icon-soc" alt="social" />
            </a>
            {/* Reddit */}
            <a
              href="https://www.reddit.com/user/Simbli_ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={soc6} className="nv-icon-soc" alt="social" />
            </a>
          </div>
        </div>
        <div className="container d-flex  align-items-center justify-content-center p-0 mt-lg-5 mt-5">
          <div className="form-overlay p-4 col-lg-9 ">
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="jesica-img-card">
                  <div className="jesica-img">
                    <Image src={kumar} alt="jesica" />
                  </div>
                  <div className="jesica-text text-lg-center text-left mt-3">
                    <h1 className="mb-0">Meet KUMAR:</h1>
                    <p className="pt-1">Your UI Designer Agent</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-12 mt-lg-0 mt-4">
                <div className="form-overlay-login text-lg-left ">
                  <p className="form-p mb-0">
                    {" "}
                    {isSignupMode
                      ? "Create your account to get started."
                      : "Welcome back! Please sign in."}{" "}
                  </p>
                  <h6 className="form-h6">Kumar AI</h6>
                </div>
                <form
                  className="mt-4"
                  onSubmit={isSignupMode ? handleEmailSignup : handleEmailLogin}
                >
                  {/* Email */}
                  <label className="label">Email</label>
                  <div className="input-group-1 mt-2">
                    <span className="input-icon" aria-hidden="true">
                      {/* New Email SVG */}
                      <svg
                        width="22"
                        height="19"
                        viewBox="0 0 22 19"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4.1875L9.1649 10.2601C9.8261 10.7519 10.1567 10.9978 10.5163 11.093C10.8339 11.1772 11.1661 11.1772 11.4837 11.093C11.8433 10.9978 12.1739 10.7519 12.8351 10.2601L21 4.1875M5.8 18H16.2C17.8802 18 18.7202 18 19.362 17.6526C19.9265 17.347 20.3854 16.8594 20.673 16.2596C21 15.5777 21 14.6852 21 12.9V6.1C21 4.31483 21 3.42225 20.673 2.74041C20.3854 2.14064 19.9265 1.65301 19.362 1.34742C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.34742C2.07354 1.65301 1.6146 2.14064 1.32698 2.74041C1 3.42225 1 4.31483 1 6.1V12.9C1 14.6852 1 15.5777 1.32698 16.2596C1.6146 16.8594 2.07354 17.347 2.63803 17.6526C3.27976 18 4.11984 18 5.8 18Z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={formData?.email}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Enter Your Email"
                    />
                  </div>
                  {/* Username */}
                  {isSignupMode && (
                    <>
                      <label className="label mt-3">Username</label>
                      <div className="input-group-1 mt-2">
                        <span className="input-icon" aria-hidden="true">
                          {/* New Email SVG */}
                          <svg
                            width="22"
                            height="19"
                            viewBox="0 0 22 19"
                            fill="none"
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4.1875L9.1649 10.2601C9.8261 10.7519 10.1567 10.9978 10.5163 11.093C10.8339 11.1772 11.1661 11.1772 11.4837 11.093C11.8433 10.9978 12.1739 10.7519 12.8351 10.2601L21 4.1875M5.8 18H16.2C17.8802 18 18.7202 18 19.362 17.6526C19.9265 17.347 20.3854 16.8594 20.673 16.2596C21 15.5777 21 14.6852 21 12.9V6.1C21 4.31483 21 3.42225 20.673 2.74041C20.3854 2.14064 19.9265 1.65301 19.362 1.34742C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.34742C2.07354 1.65301 1.6146 2.14064 1.32698 2.74041C1 3.42225 1 4.31483 1 6.1V12.9C1 14.6852 1 15.5777 1.32698 16.2596C1.6146 16.8594 2.07354 17.347 2.63803 17.6526C3.27976 18 4.11984 18 5.8 18Z"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>

                        <input
                          type="text"
                          name="username"
                          value={formData?.username}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="Enter Your Username"
                        />
                      </div>
                    </>
                  )}

                  {/* Password */}
                  <label className="label mt-3">Password</label>
                  <div className="input-group-1 mt-2">
                    <span className="input-icon" aria-hidden="true">
                      {/* Key icon stays the same */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </span>

                    <input
                      name="password"
                      value={formData?.password}
                      onChange={handleInputChange}
                      type={showPassword ? "text" : "password"}
                      className="input-field"
                      placeholder="Enter Your Password"
                    />

                    <button
                      type="button"
                      className="toggle-button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        // Eye-off (you can keep your previous if you want)
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        // New Eye-close icon
                        <svg
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                        >
                          <path
                            d="M9.58665 3.09232C9.99315 3.03223 10.4123 3 10.8441 3C15.9491 3 19.299 7.50484 20.4244 9.2868C20.5606 9.5025 20.6287 9.6103 20.6668 9.7767C20.6955 9.9016 20.6954 10.0987 20.6668 10.2236C20.6286 10.3899 20.5601 10.4985 20.4229 10.7156C20.123 11.1901 19.6659 11.8571 19.0602 12.5805M5.56807 4.71504C3.406 6.1817 1.9382 8.2194 1.26486 9.2853C1.12803 9.5019 1.05962 9.6102 1.02149 9.7765C0.992848 9.9014 0.992837 10.0984 1.02146 10.2234C1.05958 10.3897 1.12768 10.4975 1.26388 10.7132C2.38929 12.4952 5.73916 17 10.8441 17C12.9025 17 14.6756 16.2676 16.1325 15.2766M1.84417 1L19.8441 19M8.72285 7.87868C8.17995 8.4216 7.84417 9.1716 7.84417 10C7.84417 11.6569 9.18735 13 10.8441 13C11.6725 13 12.4225 12.6642 12.9654 12.1213"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="submit-btn col-lg-12 mt-4">
                    <button className="login-sim" type="submit">
                      {isSignupMode ? "Sign Up" : "Login"}
                    </button>
                    <p
                      className="mt-2 text-center"
                      style={{
                        color: "#ffffff",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => setIsSignupMode((prev) => !prev)}
                    >
                      {isSignupMode
                        ? "Already have an account?"
                        : "Don't have an account?"}
                      <span style={{ color: "#C0FFC0" }}>
                        {isSignupMode ? " Login" : " Sign up"}
                      </span>
                    </p>
                  </div>
                </form>

                {/* or */}
                {/* <div className="or-simbli row d-flex align-item-center justify-content-center py-lg-2">
                  <div className="simbli-line col-lg-5 col-md-5  col-12 d-none d-lg-block d-md-block mt-2"></div>
                  <p
                    className="pb-0 mb-0 text-center col-md-2 col-lg-2 col-12 text-center"
                    style={{ color: "#ffffff", fontSize: "15px" }}
                  >
                    OR
                  </p>
                  <div className="simbli-line col-lg-5 col-md-5 col-12 d-none d-lg-block d-md-block mt-2"></div>
                </div> */}

                {/* social login */}
                <div className="social-logins mt-2">
                  <div className="row">
                    <div className="col-lg-6 col-6">
                      {/* Google button */}
                      {/* <button className="microsoft-btn mt-lg-0">
                            {" "}
                            <Image
                              src={social1}
                              alt="social"
                              className="google-login me-1"
                            />
                            Google
                          </button> */}
                      {/* <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                      >
                        <GoogleLogin
                          onSuccess={handleSuccess}
                          onError={handleError}
                        />
                      </GoogleOAuthProvider> */}
                    </div>
                    {/* <div className="col-lg-6 col-6">
                      <button
                        className="microsoft-btn "
                        onClick={handleLinkedInLogin}
                      >
                        {" "}
                        <Image
                          src={social2}
                          alt="social"
                          className="google-login me-1"
                        />
                        LinkedIn
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            ...(snackbarSeverity === "success" && {
              backgroundColor: "#58C958",
            }),
            ...(snackbarSeverity === "error" && {
              backgroundColor: "#E74C3C",
            }),
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
