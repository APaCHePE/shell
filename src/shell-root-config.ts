import { navigateToUrl, registerApplication, start } from "single-spa";
import "primeicons/primeicons.css";
import { addErrorHandler } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import "./styles.scss";

import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();

addErrorHandler((err) => {
  if (
    err.appOrParcelName === "mf-authetication" &&
    err.message.includes("route")
  ) {
    navigateToUrl("/public/not-found");
    return false;
  }
  return true;
});

start();
