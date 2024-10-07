import { Module, Provider } from '@nestjs/common';
import { Pool } from 'pg';
import { DATABASE, PASSWORD, PG_CLIENT } from './db.constants';
const dbProvider: Provider = {
  provide: PG_CLIENT,
  useValue: new Pool({
    host: 'localhost',
    user: 'postgres',
    password: PASSWORD,
    database: DATABASE,
    port: 5432,
  }),
};
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
