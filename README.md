# NC-News-Backedn

A comprehensive and fully functional PostgreSQL (PSQL) database implementation. This database has been rigorously tested with approximately 40 different tests to ensure its robustness and seamless communication with the backend.

## Technologies/Languages:
- JavaScript
- Node.js
- PSQL
- Jest

## Setup: 
1. **Clone this repo to your local machine**
   - Use `git clone <repository-url>` to clone the repository to your local machine.

2. **Run "npm install"**
   - Execute `npm install` to install project dependencies.

3. **Install pg, express, and dotenv using the terminal**
   - Run the following command in your terminal:
     ```sh
     npm install pg express dotenv
     ```

4. **Install supertest and jest as development dependencies using the terminal**
   - Install `supertest` and `jest` as development dependencies:
     ```sh
     npm install --save-dev supertest jest
     ```

5. **Ensure your local PSQL server is running**
   - Make sure your local PostgreSQL server is running.

6. **Add the HOST, USER, DATABASE, and PORT as environment variables in a .env file**
   - Create a `.env` file in the project root directory and add the following variables with your local server details:
     ```
     USER="username_here"
     HOST="hostname_here"
     DATABASE="dbname_here"
     PORT="44333"
     ```

7. **Add this file to your gitignore file**
   - Ensure to add `.env` to your `.gitignore` file to prevent it from being tracked by Git.

8. **In the connection.js file, change the pool constant to "const pool = new Pool(localConfig);"**
   - Update the `connection.js` file to use your local configuration. Change the `pool` constant declaration to:
     ```javascript
     const pool = new Pool(localConfig);
     ```

9. **Uncomment the entire code in listen.js**
   - Uncomment all the code in `listen.js` file to ensure it runs locally. This might involve removing comment delimiters (`/* ... */`) or uncommenting individual lines as necessary.

These steps ensure that all necessary configurations and dependencies are set up correctly for running your Node.js application locally with PostgreSQL and testing capabilities enabled.

## Testing: 

1. **Setup Database Instance on Local Server**
   - Initialize the database instance on your local server:
     ```sh
     npm run set-dbs
     ```

2. **Seed the Database**
   - Populate the database with initial data:
     ```sh
     npm run seed
     ```

3. **Verify Local Database Setup**
   - Before proceeding, confirm that your local server includes databases named `nc_news_test` and `nc_news`, and these databases contain tables with initial data.

4. **Run Tests**
   - Execute tests to verify functionality:
     ```sh
     npm test
     ```
