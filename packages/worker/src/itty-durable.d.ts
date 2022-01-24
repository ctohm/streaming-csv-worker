

declare module 'itty-durable' {
    import { EnvWithDurableObject } from 'itty-router-extras';

    function proxyDurable(durable: DurableObjectNamespace, middlewareOptions: { name?: string, [s: string]: unknown }): DurableObjectStub


    type DurableMiddleware = (request: Request, env: EnvWithDurableObject) => void;
    type ClassProps<T> = Pick<T, keyof T>;

    type RecordOf<T> = { [P in keyof T]: T[P] };
    interface Constructor<T extends IttyDurableInterface> {
        new(...args: any): T;
    }

    /*  type WebSocketWithTimings = WebSocket & {
          timings?: HeadersWithTimings
          
      }*/


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
    type DurableStateWithSessions<TSessionType> = DurableObjectState & EnvWithDurableObject & {
        defaultState: undefined;
    } & {
        sessions: DurableSessionsMap<TSessionType>
    };

    type DurableSessionsMap<TSessionType> = Map<string, TSessionType>;




    class IttyDurable<TSessionType> implements DurableObject {
        state: DurableStateWithSessions<TSessionType>
        storage: DurableObjectStorage
        constructor(state: DurableStateWithSessions<TSessionType>, env: EnvWithDurableObject)
        fetch(
            request: Request,
            env?: EnvWithDurableObject
        ): Promise<Response>;
        toJSON(): Response
    }
}
