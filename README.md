# Pixelcide

Pixcelcide is a cooperative multiplayer game based on the card game [Regicide](https://www.badgersfrommars.com/assets/RegicideRulesA4.pdf). The app was built using React, React Router and Framer motion on the frontend. The backend was built on express with JSON Web Tokens used for authentication. The database was created on PostgreSQL and socket io was used to handle real time communication between players.

## [🚀 Live demo](https://pixelcide.netlify.app/)

## Setup Instructions

1. Clone repository onto your local machine. Run the following command in both the frontend and backend directories to install all dependancies.

```bash
npm i
```

2. Create a .env file in the root of the backend following the example of the .env.local.example as a template.

3. Reset local database:

```bash
npm run db:reset
```

4. Run the express server in the backend directory:

```bash
npm run start
```

5. Run the webpack server in the frontend directory:

```bash
npm run start
```

## Dependencies

### Backend

- express
- express-session
- jsonwebtoken
- pg
- socket.io

### Frontend

- axios
- framer-motion
- jwt-decode
- lodash
- nes.css
- react
- react router
- react confetti
- sass
- socket.io-client

## Authored By

### John Carlo Flores

### Mo Tariq

### Gagandeep Singh
