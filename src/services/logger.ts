import pino from 'pino';
const logger = pino();

export enum ReqColor {
    GET = '\x1b[36m',
    POST = '\x1b[32m',
    PATCH = '\x1b[33m',
    PUT = '\x1b[33m',
    DELETE = '\x1b[31m'
}

export interface LogOptions {
    context?: string;
}

export class Logger {
    context = '';

    constructor(context: string) {
        this.context = context;
    }

    getTimestamp(): string {
        const now = new Date();
        return `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    }

    getPrefix({ context = this.context }: LogOptions = {}): string {
        let prefix = '';

        if (context) {
            prefix += `[${context}]`;
        }

        return prefix;
    }

    error(message: string, data?: any, options?: LogOptions): void {
        if (!__DEV__) return;

        try {
            logger.error({ context: this.getPrefix(options), data }, message);
        } catch (err) {
            console.error('Erro ao enviar error para serviço', err);
        }
    }

    log(message: string, options?: LogOptions): void {
        if (!__DEV__) return;

        try {
            logger.info(
                `${this.getTimestamp()} ${this.getPrefix(
                    options
                )} ==> ${message}\x1b[0m `
            );
        } catch (err) {
            console.error('Erro ao enviar log para serviço', err);
        }
    }

    warn(message: string, options?: LogOptions): void {
        if (!__DEV__) return;

        try {
            logger.warn({ context: this.getPrefix(options) }, message);
        } catch (err) {
            console.error('Erro ao enviar warn para serviço', err);
        }
    }
}
