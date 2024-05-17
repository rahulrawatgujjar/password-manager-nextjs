import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  id: String,
  site: String,
  username: String,
  password: String,
  userId: String
});

export const Password =mongoose.models.passwords || mongoose.model("passwords",PasswordSchema)