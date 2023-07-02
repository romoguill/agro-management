import pino from 'pino';
import path from 'path';

const transport = pino.transport({
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

export const logger = pino(transport);
