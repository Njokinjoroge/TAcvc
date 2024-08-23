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

