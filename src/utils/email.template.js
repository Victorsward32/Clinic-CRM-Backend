export const emailTemplate = (otp,name)=> {
return  `
<div style="font-family: Arial, sans-serif; padding: 20px;">
  <h2 style="color:#2563EB;">Clinic CRM Password Reset</h2>
  <p>Hello ${name || "User"},</p>

  <p>You requested to reset your password.</p>

  <div style="
    background:#f4f6f8;
    padding:15px;
    font-size:24px;
    text-align:center;
    letter-spacing:4px;
    font-weight:bold;
  ">
    ${otp}
  </div>

  <p>This OTP is valid for <b>10 minutes</b>.</p>

  <p>If you did not request this, please ignore this email.</p>

  <br/>
  <p style="font-size:12px;color:#888;">
    Clinic CRM • Secure Healthcare System
  </p>
</div>
`;
}