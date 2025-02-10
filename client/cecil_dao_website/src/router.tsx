import { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";

import Layout from "@components/Layout";

import LandingPage from "views/LandingPage";
import CecilTheLion from "views/cecil-the-lion/CecilTheLion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "cecil-the-lion",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <CecilTheLion />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <div>Page not found</div>,
      },
    ],
  },
]);

const Router = () => {
  return (
    <ReactRouterProvider
      router={router}
      fallbackElement={<div>Loading...</div>}
    />
  );
};

export default Router;
