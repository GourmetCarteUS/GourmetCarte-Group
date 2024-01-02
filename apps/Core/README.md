## GC-Core

This is the core of the GC-Modding Api. It contains all the basic functions and classes that are used by the other packages. It also contains the main class that is used to start the modding Api.

### Getting Started - install dependencies and runtime

Before you start, make sure you have the following installed:

-   [Node.js](https://nodejs.org) (v14 or higher) Can be installed via `nodenv` or downloaded from the website.
-   `.env` file. - needs to be placed at /GC-Core/.env
-   `mongo.crt` file. - needs to be placed at /GC-Core/mongo.crt

#### Install dependencies

`yarn`

### Start local server

`yarn start`

### Build & Bundle

`yarn build`

### DATABASE change MakeMigration and Migrate

Everytime when making changes to the database, you need to make a migration and migrate it to the database.

Step1:
`yarn makemigration`  
Step2:
`yarn migrate`
