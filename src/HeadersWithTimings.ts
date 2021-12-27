
export class HeadersWithTimings extends Headers {
    private startTime: number = 0;
    private started_at: number = Date.now();
    previousEndTime!: number
    constructor(init: HeadersInit) {
        super(init)
        if (this.has('startTime')) this.startTime = Number(this.get('startTime'))
        if (this.has('started_at')) {

            this.started_at = Number(this.get('started_at'))
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

    appendPartialTiming(name: string): void {
        let currentTime = Date.now(),
            duration = currentTime - this.previousEndTime,
            endTime = this.startTime + duration,
            partialTiming: string = `${name};desc=${this.startTime};dur=${duration}`;
        this.previousEndTime = currentTime
        console.info(partialTiming)

        this.append('Server-Timing', partialTiming);
    };
}