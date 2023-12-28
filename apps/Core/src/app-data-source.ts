import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'Z',
    synchronize: false,
    logging: true,
    entities: ['./src/models/*.ts'],
    subscribers: [],
    legacySpatialSupport: false,
    migrations: ['./src/migrations/*.ts'],
});

AppDataSource.initialize()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => console.log(error));
