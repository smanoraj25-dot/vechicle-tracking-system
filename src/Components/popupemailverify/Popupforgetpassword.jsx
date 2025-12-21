import { toast } from "react-toastify";
import "./Popup.css";
import React, { useState } from "react";
import email from "../../assets/images/icons/email.png";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKENDURL;
const PopupForgetPassword = ({ setPopuptoggle }) => {
    const [fpemail, setFpemail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const validateEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const handleResendResetPassword =async () => {
        setLoading(true)
        if (!fpemail) {
            setError("Email is required");
            toast.error("Please enter your email address");
            setLoading(false)
            return;
        }
        if (!validateEmail(fpemail)) {
            setError("Invalid email format");
            toast.error("Please enter a valid email address");
            setLoading(false)
            return;
        }
       try{
        await axios.post(`${API_URL}/api/users/forgot-password`,{
            email:fpemail
        })
        setPopuptoggle(false)
        toast.success("Reset password link has been sent to your email");
       }catch(err){
        toast.error(err.response.data.error);
       }finally{
         setError("");
        setLoading(false)
       }
      console.log(loading);
      
    };
    return (
        <div className="popup-wrapper">
            <div className="popup-inner-email">
                <button className="pop-close-btn" onClick={() => setPopuptoggle(false)}>×</button>
                <img src={email} alt="Email Icon" width="70px" />
                <h2 className="popupad">Enter your email address</h2>

                <div className="popupinp-wrapper">
                    <input
                        type="email"
                        className="popupinp"
                        value={fpemail}
                        onChange={(e) => setFpemail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    {error && <p className="error-text">{error}</p>}
                </div>
                
                <button className="verifypopup" onClick={handleResendResetPassword} disabled={loading}>{loading ? "Sending..." : "Reset Password"}</button>
            </div>
        </div>
    );
};

export default PopupForgetPassword;
