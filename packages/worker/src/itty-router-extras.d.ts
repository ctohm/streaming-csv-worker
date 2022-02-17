declare module "itty-router-extras" {
    import { Router, Route, RouterOptions } from 'itty-router'
    import { IttyDurable } from 'itty-durable'

    function ThrowableRouter<TRequest>(options?: RouterOptions<TRequest> & { stack?: boolean }): Router<TRequest>
    type ThrowableRouter<TRequest> = {
        handle: (request: Request & TRequest, ...extra: any) => any
    } & {
        [any: string]: Route
    }


    type DurableStubGetter<TSessionType> = {
        get(id: string): IttyDurable<TSessionType>;
    };

    export type EnvWithDurableObject = {
        DurableWk: DurableObjectNamespace
        defaultState: undefined
        GCLOUD_FUNCTION_HOST: string
    }
    type TRequestWithParams<TSessionType> = Request & {
        GCLOUD_FUNCTION_HOST: string;
        DurableWk: DurableStubGetter<TSessionType>
        reqHeaders: {
            [s: string]: string;
        },
        params: {
            [s: string]: string,
        };
    };

    function withParams(req: Request): void;
    function json(body: unknown, responseType?: ResponseInit): Response
    function missing(message?: string): Response
    function error(header?: number, body?: unknown): Response
}
