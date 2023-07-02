import pino from 'pino';

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
      options: { destination: `${__dirname}/server.log` },
    },
  ],
});

export const logger = pino(transport);
