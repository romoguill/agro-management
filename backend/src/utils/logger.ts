import path from 'path';
import pino from 'pino';

let transport = null;

if (process.env.NODE_ENV === 'test') {
  transport = pino.transport({
    targets: [
      {
        target: 'pino/file',
        level: 'info',
        options: {
          destination: path.join(__dirname, '../..', 'logs/server.log'),
        },
      },
    ],
  });
} else {
  transport = pino.transport({
    targets: [
      {
        target: 'pino-pretty',
        level: 'info',
        options: { colorize: true },
      },
      {
        target: 'pino/file',
        level: 'info',
        options: {
          destination: path.join(__dirname, '../..', 'logs/server.log'),
        },
      },
    ],
  });
}

export const logger = pino(transport);
