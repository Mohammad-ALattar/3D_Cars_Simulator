import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";

export const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    {useRoutes(routes)}
  </Suspense>
);
