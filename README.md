# Prerequisites
* `Node` -->  `v18.14.2` or later
* `Postgres`  --> `v3.3.5` or later


## Before starting application
After cloning the repository, run the following:

```shell
npm install
```

After installing all dependencies, next step is creating `.env` file for credentials

```shell
cp .env-example .env
```

#### Then fill the fields properly!


## Build application
```shell
npm build
```

## Starting application
#### NOTE: In order to get access to create new dishes you should be an admin. To insert admin's credentials, run following script:
```shell
npm run db:seed
```

---
#### Admin's credentials:
```json
{
  "email": "superAdmin@gmail.com",
  "password": "12345678"
}
```
---

During creation of dishes `request` should be sent with `Beaerer {yourToken}` auth token

### Now you can start the application with the following script:
```shell
npm start
```

### In watch mode:
```shell
npm run start:dev
```
