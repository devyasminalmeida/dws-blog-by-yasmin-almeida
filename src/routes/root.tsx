import { Outlet } from "react-router-dom";
import Header from "../ui/molecules/Header";

export default function Root() {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
