// Required dependencies ie mysql2, csv-parse, yargs
const fs = require('fs');
const path = require('path'); 
const csv = require('csv-parser');  
const mysql = require('mysql2/promise'); 
const yargs = require('yargs');

/*
- This section uses yargs to parse command-line arguments.
- It allows users to specify the CSV file to be processed, 
- create the database table, run the script in dry-run mode,
- and provide MySQL connection details (username, password, host, port). 
- Each option is defined with a description, type, and whether it’s required. 
*/
const argv = yargs
  .option('file', {
    alias: 'f',
    description: 'Path to the CSV file',
    type: 'string',
  })
  .option('create_table', {
    description: 'Create or rebuild the users table',
    type: 'boolean',
  })
  .option('dry_run', {
    description: 'Parse the CSV without inserting data into the DB',
    type: 'boolean',
  })
  .option('u', {
    description: 'MySQL username',
    type: 'string',
    demandOption: true,
  })
  .option('p', {
    description: 'MySQL password',
    type: 'string',
    demandOption: true,
  })
  .option('h', {
    description: 'MySQL host',
    type: 'string',
    default: 'localhost',
  })
  .option('port', {
    description: 'MySQL port',
    type: 'number',
    default: 3306,
  })
  .argv;
  
/*
- This function establishes a connection to the MySQL database using the mysql2/promise library.
- The connection parameters are taken from the command-line arguments (host, port, username, password).
- The database name is hardcoded as 'user_upload_db'.
*/ 
const connectToDatabase = async () => {
    try {
      const connection = await mysql.createConnection({
        host: argv.h,
        port: argv.port,
        user: argv.u,
        password: argv.p,
        database: 'user_upload_db',
      });
      return connection;
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
      process.exit(1);
    }
};



/*
  - This function creates or rebuilds the users table in the MySQL database. 
  - The table has three columns: name, surname, and email. 
  - The email column is set to be unique to prevent duplicate entries. 
  - The table is created only if it doesn't already exist.
  */ 
  const createUsersTable = async (connection) => {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          surname VARCHAR(255),
          email VARCHAR(255) UNIQUE
        );
      `;
      try {
        await connection.query(createTableQuery);
        console.log('Users table created/rebuilt successfully.');
      } catch (error) {
        console.error('Error creating table:', error.message);
      }
  };

