import mongoose from "mongoose";

// const PasswordSchema = new mongoose.Schema({
  // id: String,
  // site: String,
  // username: String,
//   password: String,
  // userId: String
// });
const PasswordSchema = new mongoose.Schema({
  id: String,
  site: String,
  username: String,
  encryptedPassword: {
    iv: { type: String, required: true },
    content: { type: String, required: true }
  },
  userId: String

});
export const Password =mongoose.models.passwords || mongoose.model("passwords",PasswordSchema)