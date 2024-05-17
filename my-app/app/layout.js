import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from 'react-toastify';
import Script from "next/script";



const inter = Inter({ subsets: ["latin"], display: "optional" });

export const metadata = {
  title: "PassMg",
  description: "It is a web-app to store passwords.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=optional"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
        <Toaster />
        {children}
        <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
      </body>
    </html>
  );
}
