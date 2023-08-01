import "../styles/globals.css";
import localFont from "next/font/local";

const eudoxus = localFont({
  src: [
    {
      path: "./EudoxusSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./EudoxusSans-Medium.woff2",
      weight: "600",
    },
    {
      path: "./EudoxusSans-Bold.woff2",
      weight: "700",
    },
    {
      path: "./EudoxusSans-ExtraBold.woff2",
      weight: "800",
    },
  ],
});

export const metadata = {
  title: "metaverse",
  description:
    "This site is a showcase of a virtual service of online universe exploration. Choose the universe you want to enter, and enjoy the show!",
};
const RootLayout = ({ children }) => (
  // by default exduxus sans font
  <html lang="en" className={eudoxus.className}>
    {/* <html lang="en"> */}
    <head>
      {/* <link rel="preconnect" href="https://stijndv.com" />
      <link
        rel="stylesheet"
        href="https://stijndv.com/fonts/Eudoxus-Sans.css"
      /> */}
    </head>
    <body>{children}</body>
  </html>
);

export default RootLayout;
