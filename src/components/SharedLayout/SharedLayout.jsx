import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Link, Header } from "./SharedLayout.styled";
import { Loader } from "../Loader";

export const SharedLayout = () => {
  return (
    <>
      <Header>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/tweets">Tweets</Link>
        </nav>
      </Header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
