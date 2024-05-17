import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs"


export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000)
        }
      })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
        }
      })
    }



    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // your Gmail address
        pass: process.env.EMAIL_PASSWORD, // your Gmail password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email." : "Reset your password.",
      html: `<p>Click <a href="${process.env.DOMAIN}/${emailType.toLowerCase()}email?token=${encodeURIComponent(hashedToken)}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
      <br>or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/${emailType.toLowerCase()}email?token=${encodeURIComponent(hashedToken)}</p>`
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;


  } catch (error) {
    throw new Error(error.message);
  }
}