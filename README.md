<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
This project implements a simple CRUD API with the following functionalities:
1. **Create User Request**: Allows users to submit requests with their email and content, which are processed through Groq AI. The results are stored in the database and sent back to the user via email.
2. **Get User By Email**: Retrieves user details based on their email address.
3. **Get All Users**: Fetches a list of all users in the system.
4. **Get User By ID**: Fetches user details by their unique ID.

## Endpoints

### POST `/users/create-request`
- **Description**: This endpoint allows users to submit a request with their email, content, and an optional username. The content is processed by the Groq AI service, and the response is sent back to the user via email.
- **Request Body**:
    ```json
    {
      "email": "chinmay09jena@gmail.com",
      "request": "What is the weather today?",
      "username": "Chinmay"
    }
    ```
- **Response**: 
    - On success: `"Thanks! Please check your email. Here is your response: [Response from Groq AI]"`
    - On error (missing email or content): `"Email and content are required."`

### GET `/users/all-users`
- **Description**: Fetches a list of all users in the table.
- **Response**:
    - Returns an array of users, each containing `id`, `email`, `content`, `request`, `response_time`, and `created_at`.

### GET `/users/user/:id`
- **Description**: Fetches user details based on the user's ID.
- **Response**:
    - Returns the user object with the specified `id`.

### GET `/users/user-by-email/:email`
- **Description**: Fetches user details based on their email address.
- **Response**:
    - Returns the user object for the given `email`. If no user is found, returns a `404` error.

## Groq Endpoints

### GET `/groq/usage`
- **Description**: Fetches the usage data of Groq AI by sending a fixed request ("India") to Groq.
- **Response**: Returns a string containing the response from the Groq AI for the fixed input.

### GET `/groq/ask/:request`
- **Description**: Sends a dynamic request (provided as the `request` parameter in the URL) to the Groq AI service.
- **Example Request**: `/groq/ask/What is the capital of India?`
- **Response**: Returns the Groq AI's response to the provided question.

## Example Responses

- **GET `/groq/usage`**: 
  - `"Groq usage response for India"`
  
- **GET `/groq/ask/What is the capital of India?`**: 
  - `"The capital of India is New Delhi."`
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests (no test added)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Resources

Check out the following resources that are implemented or integrated with NestJS in this project:

- **Groq AI**: A powerful AI tool for generating content, predictions, and recommendations. [Visit Groq AI Documentation](https://groq.ai/)
  
- **Email Service**: Implemented email service using NestJS for sending templated HTML emails with custom content. [Explore Email Service Docs](https://nestjs.com/docs/email)

- **PostgreSQL (PSQL)**: A powerful, open-source relational database system used in this project for data storage and management. [Visit PostgreSQL Official Site](https://www.postgresql.org/)

Here’s the SQL command to create the users1 table in PostgreSQL:

```sql
CREATE TABLE users1 (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    request TEXT,
    response_time INTERVAL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Need Help
- Here i am fetching api and database config values from .env in config dir.
- And the in different services using those config vatiables.
- My Question is Should i directly pass env values in Service or config methods?
- What is the Industry Approch?
 