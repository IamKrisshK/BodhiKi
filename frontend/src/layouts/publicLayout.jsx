import { Outlet } from "react-router-dom";
import Navbar from "../comp/Navbar";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}