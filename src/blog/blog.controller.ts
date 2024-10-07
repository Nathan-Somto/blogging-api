import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/zod.pipe';
import {
  createBlogDto,
  createBlogSchema,
  updateBlogDto,
  updateBlogSchema,
} from './blog.schema';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createBlogSchema))
  createBlog(@Body() createBlogDto: createBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }
  @Get()
  getBlogs(@Query('term') term?: string) {
    return this.blogService.getBlogs(term);
  }
  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateBlogSchema))
  updateBlog(@Param('id') id: string, @Body() updateBlogDto: updateBlogDto) {
    return this.blogService.updateBlog(id, updateBlogDto);
  }
  @Delete(':id')
  deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }
  @Get(':id')
  getBlog(@Param('id') id: string) {
    return this.blogService.getBlog(id);
  }
}
