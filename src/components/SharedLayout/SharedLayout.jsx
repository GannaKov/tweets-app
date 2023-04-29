import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Link, Container, Header } from "./SharedLayout.styled";
import { Loader } from "../Loader";

export const SharedLayout = () => {
  return (
    // <Container>
    <>
      <Header>
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/tweets">Tweets</Link>
        </nav>
      </Header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>

    // </Container>
  );
};
