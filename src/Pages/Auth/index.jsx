import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import loginimg from "../../assets/images/login/login.png";
import { FaUserCircle, FaPhone } from "react-icons/fa";
import { RiLockPasswordLine, RiLoginCircleLine } from "react-icons/ri";
import { IoMail } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import "./style.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import Popup from "../../Components/popupemailverify/Popup.jsx";
import Popupforgetpassword from "../../Components/popupemailverify/Popupforgetpassword.jsx";
import { mergeGuestWishlist } from "../wishlist/LSWishlistAddRemove.js";
import { mergeGuestCart } from "../Cart/LSCartAddRemove.js";
import {
    useLoginMutation,
    useRegisterMutation,
    useSendVerificationCodeMutation,
    useVerifyCodeMutation,
    useLazyGetUserQuery,
} from "../../features/users/authApi.js";
import { useAddToWishlistMutation, useGetWishlistQuery } from "../../features/products/wishlistApi";
import { useAddToCartMutation, useGetCartQuery } from "../../features/products/cartApi.js";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();
    const [getUser] = useLazyGetUserQuery();

    const handleSuccess = async (response) => {
        const decoded = jwtDecode(response.credential);
        const sigindata = {
            name: decoded.name,
            email: decoded.email,
            isgauth: decoded.email_verified,
        };

        try {
            await register(sigindata).unwrap();
            await getUser().unwrap();
            navigate("/");
            toast.success("Signed up successfully!");
        } catch (error) {
            toast.error(error.data?.error || "An error occurred");
        }
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="flex justify-center mt-4">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => toast.error("Google Login Failed")}
                    text="continue_with"
                />
            </div>
        </GoogleOAuthProvider>
    );
};

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  icon,
}) => (
  <div>
    <div className="login-inp-pos">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="login-input"
        placeholder={placeholder}
      />
      {icon}
    </div>
    {error && <div className="log-err">{error}</div>}
  </div>
);

const Auth = () => {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const [verifyCode] = useVerifyCodeMutation();
  const [getUser] = useLazyGetUserQuery();
  const [addToWishlistMutation] =useAddToWishlistMutation()
  const [addToCartMutation]=useAddToCartMutation();
  const [isLogintype, setisLogintype] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { isLogin, user } = useSelector((state) => state.auth);
  const { data: wishlist } = useGetWishlistQuery(user?.id, { skip: !user });
  const { data: cart } = useGetCartQuery(user?.id, { skip: !user });
  const [popuptoggle, setPopuptoggle] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isemailverify, setIsemailverify] = useState(false);
  const [fpemail, setfpemail] = useState(false);
  
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) setFormData((prev) => ({ ...prev, email: storedEmail }));
  }, []);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    else if (!isemailverify && !isLogintype)
      newErrors.email = "Click Verify to verify your Email";

    if (!isLogintype) {
      if (!formData.name) newErrors.name = "Name is required.";
      if (!formData.phone) newErrors.phone = "Phone number is required.";
      else if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 8)
      newErrors.password = "Password should be at least 8 characters.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
        if (isLogintype) {
            await login(formData).unwrap();
        } else {
            await register(formData).unwrap();
        }

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const { user } = await getUser().unwrap();

      await mergeGuestWishlist(addToWishlistMutation, user.id, wishlist || []);
      await mergeGuestCart(addToCartMutation, user.id, cart || []);

      navigate("/Account");

      toast.success(
        isLogintype ? "Logged in successfully!" : "Signed up successfully!",
      );

      setFormData({ name: "", email: "", password: "", phone: "" });
    } catch (error) {
      console.log(error);
      toast.error(error.data?.error || "An error occurred");
      setErrors({ email: error.data?.error });
    }
  };

  const handleEmailVerification = async () => {
    try {
        if (!formData.email) {
            setErrors({ email: "Email is required." });
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setErrors({ email: "Invalid email format." });
            return;
        }

        await sendVerificationCode({ email: formData.email, name: formData.name || '' }).unwrap();
        toast.success("Verification code sent to your email.");
        setPopuptoggle(true);
    } catch (error) {
        toast.error(error.data?.message || "An error occurred");
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      toast.error("Please enter the verification code.");
      return;
    }

    try {
        await verifyCode({ email: formData.email, code: verificationCode }).unwrap();
        toast.success("Email verified successfully!");
        setIsemailverify(true);
        setPopuptoggle(false);
    } catch (error) {
        toast.error("Verification failed. Try again.");
    }
  };

  return !isLogin ? (
    <>
      {popuptoggle && (
        <Popup
          handleVerifyCode={handleVerifyCode}
          handleEmailVerification={handleEmailVerification}
          setVerificationCode={setVerificationCode}
        />
      )}
      {fpemail && <Popupforgetpassword setPopuptoggle={setfpemail} />}
      <section className="d-flex align-items-center justify-content-center">
        <div className="login-wrapper">
          <div className="row align-items-center row-gap-5 login-rev">
            <div className="col-lg-6 col-md-5 login-img-wrap">
              <img src={loginimg} alt="Login" className="w-100" />
            </div>
            <div className="col-lg-6 col-md-7 login-inp-wrapper">
              <h4 className="login-heading">
                {isLogintype ? "Log In" : "Sign Up"}
              </h4>
              <form onSubmit={handleSubmit} className="login-form-wrapper">
                {!isLogintype && (
                  <InputField
                    type="text"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={(val) => handleChange("name", val)}
                    error={errors.name}
                    icon={<FaUserCircle className="log-inp-icon" />}
                  />
                )}
                <InputField
                  type="text"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={(val) => handleChange("email", val)}
                  error={errors.email}
                  icon={
                    !isLogintype ? (
                      <>
                        <IoMail className="log-inp-icon" />{" "}
                        <button
                          type="button"
                          className="verify"
                          onClick={handleEmailVerification}
                        >
                          <TiTick />
                          verify
                        </button>
                      </>
                    ) : (
                      <IoMail className="log-inp-icon" />
                    )
                  }
                />

                {!isLogintype && (
                  <InputField
                    type="text"
                    placeholder="Enter Your Phone"
                    value={formData.phone}
                    onChange={(val) => handleChange("phone", val)}
                    error={errors.phone}
                    icon={<FaPhone className="log-inp-icon" />}
                  />
                )}
                <InputField
                  type="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={(val) => handleChange("password", val)}
                  error={errors.password}
                  icon={<RiLockPasswordLine className="log-inp-icon" />}
                />

                {isLogintype && (
                  <div className="d-flex align-items-center gap-2 pt-2 login-inp-pos">
                    <input
                      type="checkbox"
                      id="loginRem"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="loginRem" className="login-label">
                      Remember Me
                    </label>
                    <input
                      type="checkbox"
                      id="loginfp"
                      checked={fpemail}
                      onChange={(e) => setfpemail(e.target.checked)}
                    />
                    <label htmlFor="loginfp" className="login-labelfp">
                      forget password
                    </label>
                  </div>
                )}

                <button className="login-btn-f" type="submit">
                  {isLogintype ? "Log In" : "Sign Up"} <RiLoginCircleLine />
                </button>
              </form>

              <GoogleLoginButton />

              <p
                className="dont-btn-log"
                onClick={() => setisLogintype(!isLogintype)}
              >
                {isLogintype
                  ? "Don't have an account yet? "
                  : "Already have an account? "}
                <span>{isLogintype ? "Sign Up" : "Log In"}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <Navigate to={"/Account"} />
  );
};

export default Auth;
