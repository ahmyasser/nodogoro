import { Router } from "express";
import {
  LocationRoutes
} from "./routes";

export default () => {
  const app = Router();
  LocationRoutes(app);
  return app;
};
