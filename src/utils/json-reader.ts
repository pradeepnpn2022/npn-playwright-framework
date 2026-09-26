import fs from 'fs-extra';
import logger from "./logger";

export class JsonReader {
  static read<T>(filePath: string): T {
    logger.info(`Reading JSON: ${filePath}`);
    return fs.readJsonSync(filePath) as T;
  }
}