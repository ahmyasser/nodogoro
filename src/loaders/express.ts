import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import config from '../config';
import routes from '../api';
import errorHandler from 'errorhandler';
import cors from 'cors';
import { swaggerUi, specs } from './swagger';
const { requiresAuth } = require("express-openid-connect");
const { auth } = require("express-openid-connect");

export default ({ app }: { app: express.Application }) => {
  app.use(auth(config.Auth0));
  
  app.get("/profile", requiresAuth(), (req: any, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  /**
   * Error Handler. Provides full stack - remove for production
   */
  app.use(errorHandler());

  /**
   * Primary app routes.
   */
  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('The app is up and running!');
  });

  /**
   * The magic package that prevents frontend developers going nuts
   * Alternate description: Enable Cross Origin Resource Sharing to all origins by default
   */
  app.use(cors());

  // Express configuration
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));

  /**
   * Load API routes.
   */

  app.use(config.api.prefix, routes());
};
