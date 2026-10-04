/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
import getEnv from '../utils/getEnv.js';

type LogType = 'simple' | 'complete';

async function createLogsFolder() {
  const env = getEnv();
  const logsFolder = `${process.cwd()}/${env.LOGS_FOLDER}`;

  try {
    await fs.access(logsFolder);
  } catch (err) {
    await fs.mkdir(logsFolder);
  }
}

function logger(type: LogType) {
  const env = getEnv();

  if (type === 'simple') {
    return async (req: Request, res: Response, next: NextFunction) => {
      await createLogsFolder();
      const logFile = `${env.LOGS_FOLDER}/logs.log`;
      const log = `${new Date().toISOString()}, ${req.url}, ${req.method}`;
      await fs.appendFile(logFile, log);
      next();
    };
  } else {
    return async (req: Request, res: Response, next: NextFunction) => {
      await createLogsFolder();
      const logFile = `${env.LOGS_FOLDER}/logs.log`;
      const log = `${new Date().toISOString()}, ${req.url}, ${req.method}, ${req.httpVersion}, ${req.get('User-Agent')}`;
      await fs.appendFile(logFile, log);
      next();
    };
  }
}

export default logger;
