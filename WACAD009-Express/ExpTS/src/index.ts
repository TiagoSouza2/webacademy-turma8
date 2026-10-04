import express from 'express';
import getEnv from './utils/getEnv.js';
import logger from './middlewares/logger.js';
import router from './router/router.js';
import {engine} from 'express-handlebars'
import helpers from './views/helpers/helpers.js';

const env = getEnv();
const app = express();
 
app.engine("handlebars", 
    engine({
        helpers,
    }),
)

app.set("view engine", "handlebars")
app.set("views", `${process.cwd()}/src/views`)

app.use(logger('complete'));

app.use(
  '/img',
  express.static(`${process.cwd()}/public/img`),
);

app.use(router);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});