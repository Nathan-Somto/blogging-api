import { NotFoundException } from '@nestjs/common';
import { QueryResult } from 'pg';

export class Utils {
  static buildUpdateQuery(
    table: string,
    data: Record<string, unknown>,
    id: string,
  ) {
    let query = `UPDATE ${table} SET`;
    const values = [];
    if (Object.keys(data).length === 0) {
      return { query, values };
    }
    for (const key in data) {
      query += ` ${key} = $${values.length + 1},`;
      values.push(data[key]);
    }
    query = query.slice(0, -1);
    query += ` WHERE id = $${values.length + 1} RETURNING *`;
    values.push(id);
    return { query, values };
  }
  static notFoundRecord(
    resource: string,
    res: QueryResult<any>,
    ...data: string[]
  ) {
    if (res.rowCount === 0) {
      throw new NotFoundException(
        `${resource} with ${data.join(', ')} not found`,
      );
    }
  }
  static buildInsertQuery(table: string, data: Record<string, unknown>) {
    let query = `INSERT INTO ${table} (`;
    let values = 'VALUES (';
    const dynamicValues = [];
    for (const key in data) {
      query += `${key},`;
      values += `$${dynamicValues.length + 1},`;
      dynamicValues.push(data[key]);
    }
    query = query.slice(0, -1) + ')';
    values = values.slice(0, -1) + ')';
    query += ` ${values} RETURNING *`;
    return { query, values: dynamicValues };
  }
}
