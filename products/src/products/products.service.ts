import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginationDTO } from 'src/common/pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger(`ProductService`);

  onModuleInit() {
    this.$connect();
    this.logger.log(`Database connected`);
    
  }

  async create(createProductDto: CreateProductDto) {
    return await this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDTO: PaginationDTO) {

    const {page, limit} = paginationDTO;

    const totalPages = await this.product.count({ where: { available: true } });
    const lastPage = Math.ceil( totalPages / limit! );

    

    return {
      data: await this.product.findMany({
        skip: (page! - 1) * limit!,
        take: limit,
        where: {
          available: true
        }
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage
      }
    }
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: { id, available: true }
    });

    if( !product ) throw new NotFoundException(`Product not found`);

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const {id: __, ...data} = updateProductDto;
    const product = await this.product.update({
      where: { id },
      data: data
    });

    if( !product ) throw new NotFoundException(`Product not found`);

    return product;
  }

  async remove(id: number) {

    await this.findOne(id);

    const product = await this.product.update({
      where: { id },
      data: {
        available: false
      }
    });

    return product
  }
}
