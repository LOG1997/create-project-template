import { Logger, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common';
@Injectable()

export class LoggerService {
    private context?: string;
    private logger: Logger;

    public setContext(context: string) {
        this.context = context;
    }

    constructor(private configService: ConfigService) {
        this.logger = createLogger({
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.prettyPrint(),
            ),
            transports: [
                new transports.Console(),
                new transports.DailyRotateFile({
                    dirname: this.configService.get('LOG_DIR'),
                    filename: 'application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '7d',
                    format: format.combine(
                        format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        format.json(),
                    ),
                    level: 'info',
                }),
                new transports.DailyRotateFile({
                    dirname: this.configService.get('LOG_DIR'),
                    filename: 'error-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                    format: format.combine(
                        format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        format.json(),
                    ),
                    level: 'error',
                })
            ]
        });

    }
    error(ctx: any, message: string, meta?: Record<string, any>): Logger {
        return this.logger.error({
            message,
            contextNmae: this.context,
            ctx,
            ...meta,
        });
    }
    warn(ctx: any, message: string, meta?: Record<string, any>): Logger {
        return this.logger.warn({
            message,
            contextNmae: this.context,
            ctx,
            ...meta,
        });
    }
    debug(ctx: any, message: string, meta?: Record<string, any>): Logger {
        return this.logger.debug({
            message,
            contextNmae: this.context,
            ctx,
            ...meta,
        });
    }
    info(ctx: any, message: string, meta?: Record<string, any>): Logger {
        return this.logger.info({
            message,
            contextNmae: this.context,
            ctx,
            ...meta,
        });
    }
    log(ctx: any, message: string, meta?: Record<string, any>): Logger {
        return this.logger.verbose({
            message,
            contextNmae: this.context,
            ctx,
            ...meta,
        });
    }
}
