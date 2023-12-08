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

### User Signup

POST /api/v1/signup
User signup

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
"name": New User,
"email": "newuser@example.com"
}
```

### Get All Tasks

GET /api/tasks
Description: Get a list of all tasks for a user.

Request:

GET /api/v1/tasks/

Response:

```bash
  {
    "status": "success",
    "length": 3,
    "data": {
        "tasks": [
            {
                "id": "657193babe225c18f3557ae9",
                "title": "Let's go",
                "description": "Movement!",
                "status": "pending",
                "userId": "65716dd215078bfde86657e0",
                "createdAt": "2023-12-07T09:43:22.519Z",
                "updatedAt": "2023-12-07T09:43:22.519Z"
            },
            {
                "id": "657195ce7851a7b29b401181",
                "title": "What do you think?",
                "description": "Movement!",
                "status": "completed",
                "userId": "65716dd215078bfde86657e0",
                "createdAt": "2023-12-07T09:52:14.482Z",
                "updatedAt": "2023-12-07T10:05:54.938Z"
            },
            {
                "id": "657196dede5db3c8eb0ba4c0",
                "title": "Let's go",
                "description": "Make sure she pays for her transgression",
                "status": "pending",
                "userId": "65716dd215078bfde86657e0",
                "createdAt": "2023-12-07T09:56:46.826Z",
                "updatedAt": "2023-12-07T09:56:46.826Z"
            }
        ]
    }
}
```

### Get A Task

GET /api/task/:taskId
Description: Get a single task for a user.

Request:

GET /api/v1/tasks/:taskId

Response:

```bash
  {
    "status": "success",
    "data": {
        "task":
        {
                "id": "657193babe225c18f3557ae9",
                "title": "Let's go",
                "description": "Movement!",
                "status": "pending",
                "userId": "65716dd215078bfde86657e0",
                "createdAt": "2023-12-07T09:43:22.519Z",
                "updatedAt": "2023-12-07T09:43:22.519Z"
            }
    }

```

### Create A Task

POST /api/tasks
Description: Creates a task for a user.

Request:

POST /api/v1/tasks/

Content-Type: application/json

```bash
{
    "title": "Let's go",
    "description": "Make sure she pays for her transgression"
}

```

Response:

```bash
  {
    "status": "success",
    "data": {
        "task": {
            "id": "6572b97ac590a0bd98ec14dc",
            "title": "Let's go",
            "description": "Make sure to hit the gym today",
            "status": "pending",
            "userId": "65716dd215078bfde86657e0",
            "createdAt": "2023-12-08T06:36:42.567Z",
            "updatedAt": "2023-12-08T06:36:42.567Z"
        }
    }
}
```

### Update A Task

PATCH /api/v1/task/:taskId
Description: Edit a task for a user.

Request:
Pass the key and value of what you want to change. For example {
"status": "completed"
}

PATCH /api/v1/tasks/6572b97ac590a0bd98ec14dc

Content-Type: application/json

```bash
{
    "title": "Body Wellness",
}

```

Response:

```bash
  {
    "status": "success",
    "data": {
        "task": {
            "id": "6572b97ac590a0bd98ec14dc",
            "title": "Body Wellness",
            "description": "Make sure to hit the gym today",
            "status": "pending",
            "userId": "65716dd215078bfde86657e0",
            "createdAt": "2023-12-08T06:36:42.567Z",
            "updatedAt": "2023-12-08T06:40:12.567Z"
        }
    }
}
```

### Delete A Task

DELETE /api/v1/task/:taskId
Description: Delete a task for a user.

Request:

DELETE /api/v1/task/6572b97ac590a0bd98ec14dc

Response:

Returns a 204 status report.

```bash

```
