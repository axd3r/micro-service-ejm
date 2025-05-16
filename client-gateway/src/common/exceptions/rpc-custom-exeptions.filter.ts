import { ArgumentsHost, Catch, ExceptionFilter, RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();

        if(
            typeof rpcError === 'object' &&
            'status' in rpcError && 
            'message' in rpcError
        ) {
            const status = rpcError.status;
            return response.status(status).json(rpcError);
        }

        response.status(401).json({
            status: 401,
            message: 'Hola',
        })
    }
}