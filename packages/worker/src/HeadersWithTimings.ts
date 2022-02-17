
export type TWsTimingSnapshot = {
    currentTime: number,
    baseLine: number,
    timeOrigin: number,
    browserTimestamp: number,
    browserTimeOrigin: number,
    previousEndTime: number,
    delta: number,
    now: number
}
/**
 * Utility class to add timing utilities to Headers.
 */
export class HeadersWithTimings extends Headers {
    readonly baseLine: number = 0;
    readonly timeOrigin: number = Date.now();
    browserTimeOrigin!: number;
    browserTimestamp: number = Date.now();
    previousEndTime!: number
    delta: number = 0
    constructor(init: HeadersInit) {
        super(init)
        if (this.has('startTime')) this.baseLine = Math.floor(Number(this.get('startTime')))
        if (this.has('browserTimestamp')) {
            this.browserTimestamp = Math.floor(Number(this.get('browserTimestamp')))
            this.delta = Date.now() - this.browserTimestamp
        }
        if (this.has('browserTimeOrigin')) {

            this.browserTimeOrigin = Math.floor(Number(this.get('browserTimeOrigin')))
            this.previousEndTime = this.browserTimeOrigin + this.baseLine
        }
        console.log({
            timingHeaders: {
                timeOrigin: this.timeOrigin,
                browserTimeOrigin: this.browserTimeOrigin,
                startTime: this.baseLine,
                previousEndTime: this.previousEndTime
            }
        })
        this.set('Timing-Allow-Origin', '*')
    }
    static createFrom(init: HeadersInit) {
        if (init instanceof HeadersWithTimings) {
            return init
        }
        return new HeadersWithTimings(init)
    }
    now() {
        return Date.now() - this.timeOrigin
    }
    toString(): string {
        return JSON.stringify(this.toJSON())
    }
    toJSON(): TWsTimingSnapshot {
        let currentTime = Date.now()
        return {
            currentTime,
            now: currentTime - this.timeOrigin,
            baseLine: this.baseLine,
            timeOrigin: this.timeOrigin,
            browserTimeOrigin: this.browserTimeOrigin,
            browserTimestamp: this.browserTimestamp,
            previousEndTime: this.previousEndTime,
            delta: this.delta
        }
    }
    appendPartialTiming(name: string): { name: string, duration: number, startTime: number, endTime: number } {
        let { duration, endTime, startTime } = this.computePartialTiming(name),
            partialTiming: string = `${name};desc="${name}_${endTime}";dur=${duration}`;
        console.info(partialTiming)
        let previousPartialTiming = this.get('Server-Timing') || '';
        this.append('Server-Timing', partialTiming);
        return { name, duration, endTime, startTime }
    }
    computePartialTiming(name: string): { name: string, currentTime: number, duration: number, startTime: number, endTime: number, timeOrigin?: number, browserStartTime: number, previousEndTime: number } {
        let currentTime = Date.now(),
            duration = Math.floor(currentTime - this.previousEndTime),
            endTime = this.baseLine + this.now(),
            previousEndTime = this.previousEndTime

        this.previousEndTime = currentTime
        // this.startTime = endTime


        return { name, currentTime, duration, endTime, startTime: endTime - duration, timeOrigin: this.timeOrigin, browserStartTime: this.baseLine, previousEndTime }
    };
}