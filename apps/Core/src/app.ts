import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from './openApi/swagger.json' assert {type: 'json'};
import {RegisterRoutes} from './routes/routes';
import 'reflect-metadata';
import './app-data-source';
import {anyAuthentication} from "./middlewares/anyAuthentication";

const app = express();
const router = express.Router();
RegisterRoutes(router);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(anyAuthentication);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use('/api/core', router);

export default app;
