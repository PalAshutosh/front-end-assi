const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const createDatabase = async () => {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    try {
        const connection = await mysql.createConnection({
            host: DB_HOST || 'localhost',
            user: DB_USER || 'root',
            password: DB_PASSWORD || '',
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        console.log(`Database '${DB_NAME}' created or successfully checked.`);
        await connection.end();
    } catch (error) {
        console.error('Error creating database:', error.message);
        process.exit(1);
    }
};

createDatabase();
