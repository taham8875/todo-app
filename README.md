# Todo App with React Native and Express

<br />
<div align="center">
    <img src="./readme-assets/todo-logo.png" alt="Logo" width="80" height="80">
</div>

I create a simple todo app with the CRUD operations.

## Built With

Front End (mobile app):

* ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

Back End :

* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

ORM :

* ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

Database :

* ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

## Demo

https://github.com/taham8875/todo-app/assets/92264237/e630a39a-0b8e-4a02-84b7-4fc1bed8756f

## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:taham8875/todo-app.git
    ```

1. change directory to the `back-end` folder
    ```sh
    cd back-end
    ```

1. Install NPM packages
    ```sh
    npm install
    ```

1. Setup the database
    ```sh
    npx prisma migrate dev --name init
    ``` 

1. Run the app
    ```sh
    npm start
    ```

Open another terminal and run the following commands:

1. Change directory to the `front-end` folder
   ```sh
   cd front-end
   ```

1. Install NPM packages
   ```sh
    npm install
    ```

1. Run the app
    ```sh
     npm start
     ```

To run the application int the browser via `expo` run the following command:

```sh
npm run web
```

## TBD Features

Before proceeding, I would like to mention that due to my ongoing final exams, I completed the task within a limited timeframe. While I have made my best effort to deliver a functional and efficient React Native TodoApp, I acknowledge that there may be areas for improvement and refinements that could have been made given more time.

So the following features/improvements/weak points are not implemented yet:

- [ ] Password strength indicator : The password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.
- [ ] The user should be able to change the password if he/she forgets it. This also requires to get the user's email address.
- [ ] Incremental counters, don't use incremental ids for the todo items, for example, a todo competitor company can easily guess the number of todos you have created so far. Use UUIDs instead.
- [ ] The user should be able to change the order of the todo items. May be some todo items are more important than others.
- [ ] `PUT` works fine, `PATCH` doesn't.
- [ ] Commenting, controversially, developers should not comment their code, comments should describe why, not what. And the code should be self-explanatory. Watch : https://youtu.be/Bf7vDBBOBUA
-  [ ] Testing, instead of using postman, I should write some tests.
- [ ] Dark mode is a nice to have feature.
- [ ] Adding logout functionality.

This may seems like overengineering a simple todo app, but the goal is learning and practicing, so overengineering is not a problem in this context.
