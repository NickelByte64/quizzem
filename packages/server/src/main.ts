import express, { type Express } from 'express';
import helmet from 'helmet';
import { resolve } from 'node:path';

const app: Express = express();

app.use(helmet());
app.disable('x-powered-by');

app.use('/', express.static(resolve(import.meta.dirname, '../../client/dist')));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
