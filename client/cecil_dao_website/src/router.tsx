import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";

import Layout from "@components/Layout";

import LandingPage from "views/LandingPage";

import CecilTheLion from "@views/projects/CecilTheLion";
import ProtectAfricanLions from "@views/projects/ProtectAfricanLions";
import Akashingas from "@views/projects/Akashingas";
import CecilAI from "@views/projects/CecilAI";
import JusticePourEnfance from "@views/projects/JusticePourEnfance";
import Malaika from "@views/projects/Malaika";
import MightyUnderDogs from "@views/projects/MightyUnderDogs";
import TheKingsChildrensHome from "@views/projects/TheKingsChildrensHome";

import SNS from "@views/SNS";
import WhyDAO from "@views/WhyDAO";
import ICPNodes from "@views/ICPNodes";
import Neuron from "@views/Neuron";

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
            element: <CecilTheLion />,
          },
        ],
      },
      {
        path: "protecting-african-lions",
        children: [
          {
            index: true,
            element: <ProtectAfricanLions />,
          },
        ],
      },
      {
        path: "akashingas",
        children: [
          {
            index: true,
            element: <Akashingas />,
          },
        ],
      },
      {
        path: "cecil-ai",
        children: [
          {
            index: true,
            element: <CecilAI />,
          },
        ],
      },
      {
        path: "justice-pour-l-enfance",
        children: [
          {
            index: true,
            element: <JusticePourEnfance />,
          },
        ],
      },
      {
        path: "malaika",
        children: [
          {
            index: true,
            element: <Malaika />,
          },
        ],
      },
      {
        path: "mighty-under-dogs",
        children: [
          {
            index: true,
            element: <MightyUnderDogs />,
          },
        ],
      },
      {
        path: "the-kings-childrens-home",
        children: [
          {
            index: true,
            element: <TheKingsChildrensHome />,
          },
        ],
      },
      {
        path: "sns",
        children: [
          {
            index: true,
            element: <SNS />,
          },
        ],
      },
      {
        path: "why-dao",
        children: [
          {
            index: true,
            element: <WhyDAO />,
          },
        ],
      },
      {
        path: "icp-neurons",
        children: [
          {
            index: true,
            element: <ICPNodes />,
          },
        ],
      },
      {
        path: "neuron",
        children: [
          {
            index: true,
            element: <Neuron />,
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
