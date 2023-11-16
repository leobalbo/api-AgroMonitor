import mysql from 'mysql2/promise';
import dbConfig from './dbConfig';

const pool = mysql.createPool(dbConfig);

export const fetchDataFromDatabase = async (): Promise<any> => {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows] = await connection.query(
      'SELECT temp, humi, date FROM agroMonitor ORDER BY id DESC LIMIT 4'
    );

    if (!rows) {
      return [
        ['nill', 'nill', 'nill'],
        ['nill', 'nill', 'nill'],
        ['nill', 'nill', 'nill'],
        ['nill', 'nill', 'nill']
      ];
    }

    return Array.isArray(rows) ? formatRows(rows) : [];
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
  }
};

const formatRows = (rows: any[]) => {
  return rows.map((row) => ({
    temp: row.temp,
    humi: row.humi,
    date: row.date.toISOString().split('T')[0]
  }));
};

export const insertDataIntoDatabase = async (
  temperature: number,
  humidity: number,
  date: Date
): Promise<void> => {
  let connection;
  try {
    connection = await pool.getConnection();

    // Insere os dados na tabela agroMonitor
    await connection.execute(
      'INSERT INTO agroMonitor (temp, humi, date) VALUES (?, ?, ?)',
      [temperature, humidity, date]
    );
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
  }
};
