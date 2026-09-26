import fs from 'fs-extra';
import { parse } from 'csv-parse';
import logger from './logger';

export class CsvReader {
  static async read(filePath: string): Promise<any[]> {
    logger.info(`Reading CSV: ${filePath}`);
    const content = await fs.readFile(filePath, 'utf-8');
    return new Promise((resolve, reject) => {
      parse(content, { columns: true, trim: true }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });
  }
}