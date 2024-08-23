# User Upload Script Documentation
## Setup and Dependencies
- You will need Node.js installed on your system. The following dependencies are required:
1. `mysql2`: To interact with the MySQL database.
2. `csv-parser`: To parse the CSV file.
3. `commander`: For handling command line arguments.
4. `validator`: For email validation.

- Install these dependencies using the following command:
`npm install mysql2 csv-parser commander validator`

## Script Implementation
- The script uses `commander` to handle command line arguments.
- The script connects to the MySQL database using `mysql2/promise`.
- If the `--create-table` flag is provided, the script creates/rebuilds the `users` table.
- The script reads the CSV file using  `csv-parser`, capitalizes the names and surnames, validates the email, and inserts valid records into the database.
- The script also checks for errors, such as invalid emails or issues with database insertion.