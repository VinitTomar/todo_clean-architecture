import express, { Express } from 'express';
import { Routes } from '@main/routes/routes';

export class ExpressAppServer {
  private static app: Express;

  static setup() {
    this.app = express();
    this.app.use(Routes.getTodoRouter());
    return this.app;
  }
}