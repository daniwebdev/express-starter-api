
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import * as router from './routes';
import { apiKey } from './middlewares/api_key.middleware';

import * as path from 'path';

const app  = express();
const port = parseInt(process.env.PORT || '0') || 3000;


/* middleware handle error */
app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});


/* middleware handle cors origin */
app.use(cors())

/* body parser handle form data */
app.use(bodyParser.json());


/* handle form url encoded */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/* parse body as json */
app.use(express.json());


/* default on access / */
app.get("/", (req, res) => {
  res.json({ 
    status: 'success', 
    message: "ok", 
  });
});

/* load docs */
path.join(__dirname, 'public')

let docPath = path.join(__dirname, '../', 'docs');

app.use('/docs', express.static(docPath))

/* check api key (middleware) */
app.use(apiKey, router.appRouter);


app.listen(port, "0.0.0.0", () => {
  console.log(`App Running at http://localhost:${port}`);
  console.log(`Documentation at http://localhost:${port}/docs`);
});
