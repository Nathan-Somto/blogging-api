# Blogging API 🌐✍️

This project was done to learn the basics of **NestJS** as well as the basics of writing raw SQL code. However, I've realized that raw SQL is not for me, and I will be sticking to ORMs to avoid mistakes!

## Project Setup 🛠️

Make sure you have **PostgreSQL** installed before proceeding with the installation.

1. Install PostgreSQL from [here](https://www.postgresql.org/download/).
2. Ensure the PostgreSQL service is running.
3. Create Tables in Database Schema
   Run the following command to set up the database:

```bash
$ cd database &&  psql -U <username> -f database.sql
```

replace **<** **username** **>** with your actual postgres username 
4. Add your user credentials

```ts
export const PASSWORD =  '<Password>';
export const DATABASE = '<Database>';
```
replace with relevant details and paste inside in 
**./src/db/db.constants.ts**

5. Install dependencies

```bash
$ npm install
```

6. Run the Project


```bash
# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

7. Run Tests(optionally)

```bash
# Unit tests
$ npm run test
```

## API Endpoints 📡

### Create Blog Post 📝

Create a new blog post using the POST method.

- POST /posts

```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

Each blog post should have the following fields:

```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

The endpoint should validate the request body and return a 201 Created status code with the newly created blog post:

```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

Or a 400 Bad Request status code with error messages in case of validation errors.

### Update Blog Post ✏️

Update an existing blog post using the PUT method.

- PUT /posts/1

```json
{
  "title": "My Updated Blog Post",
  "content": "This is the updated content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

The endpoint should validate the request body and return a 200 OK status code with the updated blog post:

```json
{
  "id": 1,
  "title": "My Updated Blog Post",
  "content": "This is the updated content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```

Or a 400 Bad Request status code with error messages in case of validation errors. It should return a 404 Not Found status code if the blog post was not found.

### Delete Blog Post 🗑️

Delete an existing blog post using the DELETE method.

- DELETE /posts/1

The endpoint should return a 204 No Content status code if the blog post was successfully deleted or a 404 Not Found status code if the blog post was not found.

### Get Blog Post 📖

Get a single blog post using the GET method.

- GET /posts/1

The endpoint should return a 200 OK status code with the blog post:

```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

Or a 404 Not Found status code if the blog post was not found.

### Get All Blog Posts 📚

Get all blog posts using the GET method.

- GET /posts

The endpoint should return a 200 OK status code with an array of blog posts:

```json
[
  {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"],
    "createdAt": "2021-09-01T12:00:00Z",
    "updatedAt": "2021-09-01T12:00:00Z"
  },
  {
    "id": 2,
    "title": "My Second Blog Post",
    "content": "This is the content of my second blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"],
    "createdAt": "2021-09-01T12:30:00Z",
    "updatedAt": "2021-09-01T12:30:00Z"
  }
]
```

While retrieving posts, the user can also filter posts by a search term. You should do a wildcard search on the title, content, or category fields of the blog posts. For example:

**Note:** This is very simple project and i will be moving on to more complex stuff just done to learn the fundamentals.

project provided by  [roadmap.sh](https://roadmap.sh/backend/project-ideas#1-personal-blogging-platform-api)
