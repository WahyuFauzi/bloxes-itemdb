# Backend for Bloxes App

this backen use nestjs framework with express as a core and mongodb as a database

please run this backend first before you run the frontend app

you can get the frontend app here: `https://github.com/WahyuFauzi/bloxes-fm`

### Mongoose sample

### Installation

`npm install`

### Running

This example requires docker or a local mongodb installation. If using a local mongodb, see `app.module.ts` for connection options, and make sure there are matching options for the mongodb installation and the source code.

#### Docker

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up`

After running the sample, you can stop the Docker container with

`docker-compose down`

### Run the sample

Then, run Nest as usual:

`npm run start`
