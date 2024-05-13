import mongoose from "mongoose";


export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    const connection = mongoose.connection

    connection.on("connected", () => {
      console.log("MongoDB connected.")
    })

    connection.on("error", (err) => {
      console.log("MongoDB connection error, please make sure db is up and running:", err);
      process.exit()
    })


  } catch (err) {
    console.log("Something went wrong in connecting to db.");
    console.log(err)
  }
}