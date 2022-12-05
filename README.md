# Back End Server For NC-Game-Reviews
<br>

**Link to the Hosted Backend Server**

>See the hosted version of this backend by following this link --> [Api Server](https://nc-reviews-games.cyclic.app/api)


## Background

This project was a challenge given to myself from Northcoders to show the backend skillset I have been taught during my time on the course. The backend will be used as A RESTful API to insert into my front end project. This will be a type of socail media platform where users can add reviews of their chosen board games, share with others and have other users to be able to comment and like/dislike their posts.

## Technical Details

This project has be coded to show the backend skillsets in which i have learnt during my time on the software engineering course at Northcoders. During the development process of this backend project, i used **T**est **D**riven **D**evelopment (**TDD**) to make sure that the code works as intended. I tested GET, PATCH, POST and DELETE requests and for errors to improve the server's error handling.

A set of packages/frameworks was used -

Node.js: 
>Allows data to be fetched asynchronously from a database

Express: 
>This gives ways of request handling and usage of HTTP methods 

Postgres SQL: 
>A relational database

Dotenv: 
>locates local .env files to be use securely in application

Jest:
>Creates tests to make sure code works as intended 

Supertest: 
>Adds tests for HTTP requests 

**M**odel **V**iew **C**ontroller (**MVC**) archetecture was used as a means to organise the server by isolating it's components in a more manageable way

----------------------------

## How To Clone This Project

To have your own clone of this project on your local machine, copy the HTTPS url (or SSH if you have previously set one up. You can create this by following this tutorial -> https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

then open the terminal and then change directory to one where you want to place this repository in.

next, insert into your terminal:

```console
git clone 'INSERT-URL-HERE'
```

A copy of this repo will now have downloaded onto your local machine

#### **`Important for those who have cloned my repository...`**

This API server requires that anyone who pulls from this REPO to edit the .env files manually otherwise you will recieve the error...
<br>

```console
throw new Error('PGDATABASE not set')
```

## How To Fix `PGDATABASE not set` Error

For these databases to be found correctly, you must use the template of PGDATABASE=DATABASE_NAME.

For this repo,

>the file `.env.development` needs to read PGDATABASE=nc_games
<br>

>the file `.env_test` needs to be PGDATABASE=nc_games_test


**Remember that it is crucial to omit the semicolon ';' at the end of our line as it will not work and cause more errors!**
<br>
<br>

## How To I Install Dependencies

Simply enter into your terminal:
```console
npm i
```
All dependencies required to run this server locally will be installed

## How To Seed The Local Database

To do this, in the terminal write

```console
npm run seed
```

## How To Run Tests

This project uses jest to run our tests. To do this in the terminal write:

```console
npm t
```

## Setup .env Files

Create three files named `.env.test`, `.env.development`, `.env.production` in the root of the repository

```js
PGDATABASE=[your_database_name_here]      // .env.development
PGDATABASE=[your_test_database_name_here] // .env.test
DATABASE_URL=[your_database_url_here]     // .env.production
```

## Project's Node and Postgres versions used
```
Node:       18.6.0
Postgres:   14.4
```
