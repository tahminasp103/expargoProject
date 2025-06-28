const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6 rəqəmli OTP
};

export default generateOTP;