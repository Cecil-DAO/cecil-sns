import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";

import Layout from "../components/Layout";

import {
  LandingPage,
  LionPage
} from "@pages/index";

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
        path: "lion",
        children: [
          {
            index: true,
            element: <LionPage />,
          }
        ],
      },
      {
        path: "lion2",
        children: [
          {
            index: true,
            element: <LionPage />,
          }
        ],
      },
      {
        path: "lion3",
        children: [
          {
            index: true,
            element: <LionPage />,
          }
        ],
      },
      {
        path: "lion4",
        children: [
          {
            index: true,
            element: <LionPage />,
          }
        ],
      },
      // {
      //   path: "*",
      //   element: <NotFound />,
      // },
    ],
  },
]);

const RouterProvider = () => {
  return (
    <ReactRouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  );
};

export default RouterProvider;
