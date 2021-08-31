import fs from 'fs';
import https from 'https';
import path from 'path';
import app from './app';
import Logger from './lib/logger';

try {
  const PORT = process.env.API_PORT;
  const privateKey = fs.readFileSync(
    path.join(process.cwd(), '/certs/server/key.pem')
  );
  const certificate = fs.readFileSync(
    path.join(process.cwd(), '/certs/server/cert.pem')
  );
  const credentials = {
    key: privateKey,
    cert: certificate,
  };
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(PORT, () => Logger.info(`Server listen in PORT: ${PORT}`));
} catch (error: any) {
  Logger.error(`cannot start server: ${error.message}`);
}
