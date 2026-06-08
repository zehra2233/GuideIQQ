import { useState } from "react";
import "./DashboardLogin.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
function genCaptcha() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  }
  return code;
}

export default function DashboardLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({ name: "", email: "", password: "", confirm: "", captcha: "" });
  const [captchaCode, setCaptchaCode] = useState(genCaptcha);
  const [captchaError, setCaptchaError] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function refreshCaptcha() {
    setCaptchaCode(genCaptcha());
    setSignup(s => ({ ...s, captcha: "" }));
    setCaptchaError(false);
  }

  // 🔥 Firebase Login
  async function handleLogin() {
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
      navigate("/dashboard/ai");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  }

  // 🔥 Firebase Signup
  async function handleSignup() {
    setError("");
    if (signup.password !== signup.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (signup.captcha.trim() !== captchaCode) {
      setCaptchaError(true);
      setCaptchaCode(genCaptcha());
      setSignup(s => ({ ...s, captcha: "" }));
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signup.email, signup.password);
      await updateProfile(userCredential.user, { displayName: signup.name.trim() || "Admin" });
      // ✅ Clear form, show success, go to login
      setSignup({ name: "", email: "", password: "", confirm: "", captcha: "" });
      setError("");
      setSuccess("Account created! Please log in.");
      setMode("login");
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (e.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError(e.message);
      }
    }
    setLoading(false);
  }

  return (
    <div className="dl-page">
      <div className="dl-blob dl-blob-1" />
      <div className="dl-blob dl-blob-2" />
      <div className="dl-blob dl-blob-3" />
      <div className="dl-blob dl-blob-4" />

      {[...Array(12)].map((_, i) => (
        <div key={i} className="dl-particle" style={{ "--i": i }} />
      ))}

      <div className="dl-card">
        <div className="dl-logo-row">
          <svg className="dl-logo-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38 6 Q42 6 42 10 L42 28 Q42 32 38 32 L20 32 L13 42 L15 32 L10 32 Q6 32 6 28 L6 10 Q6 6 10 6 Z" fill="#202c49"/>
            <circle cx="16" cy="19" r="2.8" fill="white"/>
            <circle cx="24" cy="19" r="2.8" fill="#2ba3d6"/>
            <circle cx="32" cy="19" r="2.8" fill="white"/>
          </svg>
          <div>
            <span className="dl-logo-text">Guide<span>IQ</span></span>
          </div>
        </div>

        <h2 className="dl-welcome">
          {mode === "login" ? "ADMIN PANEL" : "Create an account"}
        </h2>

        {/* Messages */}
        {error && <p style={{ color: "red", fontSize: "13px", marginBottom: "10px", textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: "green", fontSize: "13px", marginBottom: "10px", textAlign: "center" }}>{success}</p>}

        {mode === "login" ? (
          <div className="dl-form" key="login">
            <div className="dl-field">
              <label className="dl-field-label">User ID or email address</label>
              <div className="dl-box-wrap">
                <input className="dl-box-input" type="email" placeholder="Email or phone number"
                  value={login.email} onChange={e => setLogin({ ...login, email: e.target.value })} />
              </div>
            </div>

            <div className="dl-field">
              <label className="dl-field-label">Password</label>
              <div className="dl-box-wrap">
                <input className="dl-box-input" type={showPassword ? "text" : "password"} placeholder="Enter password"
                  value={login.password} onChange={e => setLogin({ ...login, password: e.target.value })} />
                <button className="dl-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="dl-options-row">
              <label className="dl-toggle-wrap">
                <input type="checkbox" className="dl-toggle-input" />
                <span className="dl-toggle-track"><span className="dl-toggle-thumb"/></span>
                <span className="dl-toggle-label">Remember me</span>
              </label>
              <a href="#" className="dl-forgot">Forgot password?</a>
            </div>

            <button className="dl-signin-btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>

            <p className="dl-switch-center">
              Don't have an account?{" "}
              <span className="dl-switch-link" onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}>Sign up</span>
            </p>
          </div>
        ) : (
          <div className="dl-form" key="signup">
            <div className="dl-field">
              <label className="dl-field-label">Full Name <span className="dl-star">*</span></label>
              <div className="dl-box-wrap">
                <input className="dl-box-input" type="text" placeholder="John Doe"
                  value={signup.name} onChange={e => setSignup({ ...signup, name: e.target.value })} />
              </div>
            </div>

            <div className="dl-field">
              <label className="dl-field-label">Email address <span className="dl-star">*</span></label>
              <div className="dl-box-wrap">
                <input className="dl-box-input" type="email" placeholder="admin@guideiq.com"
                  value={signup.email} onChange={e => setSignup({ ...signup, email: e.target.value })} />
              </div>
            </div>

            <div className="dl-field">
              <label className="dl-field-label">Password <span className="dl-star">*</span></label>
              <div className="dl-box-wrap">
                <input className="dl-box-input" type={showPassword ? "text" : "password"} placeholder="Enter password"
                  value={signup.password} onChange={e => setSignup({ ...signup, password: e.target.value })} />
                <button className="dl-eye" onClick={() => setShowPassword(!showPassword)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="dl-field">
              <label className="dl-field-label">Confirm Password <span className="dl-star">*</span></label>
              <div className="dl-box-wrap">
                <input className="dl-box-input" type={showConfirm ? "text" : "password"} placeholder="Re-enter password"
                  value={signup.confirm} onChange={e => setSignup({ ...signup, confirm: e.target.value })} />
                <button className="dl-eye" onClick={() => setShowConfirm(!showConfirm)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="dl-field">
              <label className="dl-field-label">Enter Captcha <span className="dl-star">*</span></label>
              <div className="dl-captcha-row">
                <input
                  className={`dl-box-input dl-captcha-input ${captchaError ? "dl-box-input--error" : ""}`}
                  type="text" placeholder="Enter captcha"
                  value={signup.captcha}
                  onChange={e => { setSignup({ ...signup, captcha: e.target.value }); setCaptchaError(false); }}
                />
                <button className="dl-captcha-refresh" onClick={refreshCaptcha} type="button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                    <path d="M23 4v6h-6"/>
                    <path d="M1 20v-6h6"/>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                  </svg>
                </button>
                <div className="dl-captcha-code">{captchaCode}</div>
              </div>
              {captchaError && <p className="dl-captcha-error">Incorrect captcha. Please try again.</p>}
            </div>

            <button className="dl-signin-btn" onClick={handleSignup} disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="dl-switch-center">
              Already have an account?{" "}
              <span className="dl-switch-link" onClick={() => { setMode("login"); setError(""); setSuccess(""); }}>Sign in</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}