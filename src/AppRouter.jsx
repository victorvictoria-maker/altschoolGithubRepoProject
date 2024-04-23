import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";

let Home = lazy(() => import("./pages/Home"));
let SingleRepo = lazy(() => import("./pages/SingleRepo"));

const AppRouter = () => {
  return (
    // fallback={<div>Loading...</div>}

    <Suspense>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/404' element={<PageNotFound />} />
        {/* Nested route for SingleRepo */}
        <Route path='/repositories/:id' element={<SingleRepo />} />
        {/* 404 route */}
        <Route path='*' Component={() => <PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
