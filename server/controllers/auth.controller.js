const { sendEmail } = require("../services/email.service");
const { registerNotifyEmail } = require("../templates/email/register.email");

const ServerErr = (err, res) => {
  return res.status(500).json({
    success: false,
    message: "Server error",
    error: err.message,
  });
};

exports.register = async (req, res) => {
  try {
    console.log("Register endpoint hit with data:", req.body);
    const { email } = req.body;

    sendEmail(
      email,
      "Welcome to IT System!",
      registerNotifyEmail(req.body),
    );
    console.log("Email sent successfully to:", email);
    return res.status(200).json({
      success: true,
      message: "Registration successful, notification email sent",
    });
  } catch (err) {
    ServerErr(err, res);
  }
};
