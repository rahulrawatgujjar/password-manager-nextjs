import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs"


export const sendEmail = async ({email, emailType, userId}) => {
  try {
    const hashedToken= await bcryptjs.hash(userId.toString(),10);

    if (emailType==="VERIFY"){
      await User.findByIdAndUpdate(userId,{
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now()+3600000
      })
    } else if (emailType==="RESET"){
      await User.findByIdAndUpdate(userId,{
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now()+3600000
      })
    }



    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER_STR,
        pass: process.env.PASS_STR
      }
    });

    const mailOptions = {
      from: 'rahulrawatr320@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email." : "Reset your password.",
      html: `<p>Click <a href="${process.env.DOMAIN}/${emailType.toLowerCase()}email?token=${hashedToken}">here</a> to ${emailType==="VERIFY"? "verify your email": "reset your password"} 
      <br>or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/${emailType.toLowerCase()}email?token=${hashedToken}</p>`
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;


  } catch (error) {
    throw new Error(error.message);
  }
}