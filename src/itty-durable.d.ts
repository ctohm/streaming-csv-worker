

declare module 'itty-durable' {
    import { EnvWithDurableObject } from 'itty-router-extras';

    function proxyDurable(durable: DurableObjectNamespace, middlewareOptions: { name?: string, [s: string]: unknown }): DurableObjectStub


    type DurableMiddleware = (request: Request, env: EnvWithDurableObject) => void;
    type ClassProps<T> = Pick<T, keyof T>;

    type RecordOf<T> = { [P in keyof T]: T[P] };
    interface Constructor<T extends IttyDurableInterface> {
        new(...args: any): T;
    }




    /**
     * 
     * @param options 
     */
    function withDurables(options?: unknown): DurableMiddleware
    interface IttyDurableInterface extends DurableObject {
        new(state: DurableObjectState, env: EnvWithDurableObject): this;
        fetch(
            request: Request,
            env?: EnvWithDurableObject
        ): Promise<Response>;
        scheduled(event: ScheduledEvent): this
        toJSON(): Response
    }
    interface IttyDurableCtor<T extends IttyDurableInterface> {
        new(state: DurableObjectState, env: EnvWithDurableObject): T
    }
    class IttyDurable implements DurableObject {
        state: DurableObjectState & EnvWithDurableObject & { defaultState: undefined }
        storage: DurableObjectStorage
        constructor(state: DurableObjectState, env: EnvWithDurableObject)
        fetch(
            request: Request,
            env?: EnvWithDurableObject
        ): Promise<Response>;
        toJSON(): Response
    }
}
