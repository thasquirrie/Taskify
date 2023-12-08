# Taskify

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)

## Overview

Taskify is a backend application where authenticated users are allowed to create, read, update, delete tasks.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Prisma](https://www.prisma.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thasquirrie/taskify.git

   ```

2. Install dependencies

   ```bash
   cd taskify
   npm install or yarn
   ```

### Configuration

1. Create a .env file in the root of your project
2. Populate it with the corresponding values

   ```bash
   DATABASE_URL=
   JWT_SECRET=
   JWT_EXPIRES_IN=
   JWT_COOKIES_EXPIRES_IN=
   NODE_ENV=
   PORT=

   ```

## Usage

From the root of the project in your terminal run the code below to start the project

```bash
  npm start dev or yarn dev
```

## API Documentation

POST /api/v1/signup

Request:

Content-Type: application/json

```bash
{
"name": "New User",
"email": "newuser@example.com",
"password": "test"
}

```

Response:

```bash
{
"status": "success",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzI4ZjlmYzMxNmQ3ZmNiOTBhNTQ5NiIsImlhdCI6MTcwMjAwNjY4NywiZXhwIjoxNzA5NzgyNjg3fQ.nszc3pAe0AEUDkB9wFK7JpauJ7tRaLDC4ZKSINxjsWo",
"data": {
"user": {
"id": "65728f9fc316d7fcb90a5496",
"name": null,
"email": "thasquirrie1@gmail.com"
}
```

GET /api/tasks
Description: Get a list of all tasks for a user.

Request:

GET /api/v1/tasks/
