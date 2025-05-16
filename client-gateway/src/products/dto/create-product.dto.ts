import { IsNumber, IsPositive, IsString, Min } from "class-validator";
import { Type } from 'class-transformer';

export class CreateProductDto {

    @IsString()
    public name: string;

    @IsNumber({
        maxDecimalPlaces: 4,
    })
    @IsPositive()
    @Min(0)
    @Type(() => Number)
    public price: number

}
