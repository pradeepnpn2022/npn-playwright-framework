import XLSX from 'xlsx';
import logger from "./logger";

export class ExcelReader {
  static read(filePath: string, sheetName?: string): any[] {
    logger.info(`Reading Excel: ${filePath}`);
    const workbook = XLSX.readFile(filePath);
    const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
  }
}