import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';
require('dotenv').config();

const createDatabase = async (configService: ConfigService) => {
  const dbName = configService.get<string>('DB_DATABASE');
  const client = new Client({
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    user: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: 'postgres', // default database to connect to for creating new database
  });

  try {
    await client.connect();
    const res = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName],
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database '${dbName}' created successfully.`);
    } else {
      console.log(`Database '${dbName}' already exists.`);
    }
    process.exit(0);
  } catch (error) {
    console.error('Error checking or creating database:', error.message);
    process.exit(1);
  }
};

createDatabase(new ConfigService()).catch((error) => console.error(error));

