
export class HeadersWithTimings extends Headers {
    private startTime: number = 0;
    private started_at: number = Date.now();
    previousEndTime!: number
    constructor(init: HeadersInit) {
        super(init)
        if (this.has('startTime')) this.startTime = Math.floor(Number(this.get('startTime')))
        if (this.has('started_at')) {

            this.started_at = Math.floor(Number(this.get('started_at')))
            this.previousEndTime = this.started_at
        }
        this.set('Timing-Allow-Origin', '*')
        this.set('Trailer', 'Server-Timing')
    }
    static createFrom(init: HeadersInit) {
        if (init instanceof HeadersWithTimings) {
            return init
        }
        return new HeadersWithTimings(init)
    }

    appendPartialTiming(name: string): { [s: string]: string | number } {
        let currentTime = Date.now(),
            duration = Math.floor(currentTime - this.previousEndTime),
            endTime = this.startTime + duration,
            partialTiming: string = `${name};desc="endtime:${endTime}";dur=${duration}`;
        this.previousEndTime = currentTime
        this.startTime = endTime
        console.info(partialTiming)
        let previousPartialTiming = this.get('Server-Timing') || '';
        this.append('Server-Timing', partialTiming);
        return { name, duration, endTime, startTime: endTime - duration }
    };
}