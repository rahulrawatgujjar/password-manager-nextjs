import mongoose from "mongoose";

let isConnected; // Track the connection status

mongoose.connection.on("connected", () => {
  isConnected = true;
  console.log("MongoDB connected.");
});

mongoose.connection.on("error", (err) => {
  isConnected = false;
  console.log("MongoDB connection error, please make sure db is up and running:", err);
  process.exit();
});

export async function connect() {
  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return;
  }


  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection established.");
  } catch (err) {
    console.log("Something went wrong in connecting to db.");
    console.log(err);
  }
}



// import mongoose from "mongoose";


// export async function connect() {
//   const connection = mongoose.connection

//   connection.on("connected", () => {
//     console.log("MongoDB connected.")
//   })

//   connection.on("error", (err) => {
//     console.log("MongoDB connection error, please make sure db is up and running:", err);
//     process.exit()
//   })

//   try {
//     await mongoose.connect(process.env.MONGO_URI)
//     const connection = mongoose.connection

//     // connection.on("connected", () => {
//     //   console.log("MongoDB connected.")
//     // })

//     // connection.on("error", (err) => {
//     //   console.log("MongoDB connection error, please make sure db is up and running:", err);
//     //   process.exit()
//     // })


//   } catch (err) {
//     console.log("Something went wrong in connecting to db.");
//     console.log(err)
//   }
// }