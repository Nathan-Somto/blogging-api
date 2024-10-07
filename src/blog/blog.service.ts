import { Inject, Injectable } from '@nestjs/common';
import { createBlogDto, updateBlogDto } from './blog.schema';
import { Client, QueryResult } from 'pg';
import { PG_CLIENT } from 'src/db/db.constants';
import { Utils } from 'src/utils';
@Injectable()
export class BlogService {
  constructor(@Inject(PG_CLIENT) private conn: Client) {}
  async createBlog(createBlogDto: createBlogDto) {
    const { query, values } = Utils.buildInsertQuery('blog', createBlogDto);
    const res = await this.conn.query(query, values);
    return res.rows[0];
  }
  async updateBlog(id: string, updateBlogDto: updateBlogDto) {
    const { query, values } = Utils.buildUpdateQuery('blog', updateBlogDto, id);
    const res = await this.conn.query(query, values);
    Utils.notFoundRecord('Blog', res, id);
    return res.rows[0];
  }
  async deleteBlog(id: string) {
    const res = await this.conn.query(
      'DELETE FROM blog WHERE id = $1 RETURNING *',
      [id],
    );
    Utils.notFoundRecord('Blog', res, id);
    return res.rows[0];
  }
  async getBlog(id: string) {
    const res = await this.conn.query('SELECT * FROM blog WHERE id = $1', [id]);
    Utils.notFoundRecord('Blog', res, id);
    return res.rows[0];
  }
  async getBlogs(term?: string) {
    let res: QueryResult<any>;
    if (term) {
      res = await this.conn.query(
        'SELECT * FROM blog WHERE title ILIKE $1 OR content ILIKE $1',
        [`%${term}%`],
      );
    } else {
      res = await this.conn.query('SELECT * FROM blog');
    }
    return res.rows;
  }
}
