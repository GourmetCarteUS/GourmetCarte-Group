import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "db-mysql-sfo3-09881-do-user-7515807-0.b.db.ondigitalocean.com",
    port: 25060,
    username: "grouping",
    password: "AVNS_AwA_xb5hjs37HMf8jGp",
    database: "grouping-dev",
    synchronize: false,
    logging: true,
    entities: ['./src/models/*.ts'],
    subscribers: [],
    migrations: ['./src/migrations/*.ts'],
})

AppDataSource.initialize()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => console.log(error))