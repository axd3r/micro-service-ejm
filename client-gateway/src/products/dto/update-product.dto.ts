import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';
import { number } from 'joi';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
