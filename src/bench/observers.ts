export type TbriefEntry = {
    name: string;
    endTime: number;
    startTime: number;
    duration: number;
    entryType: string;
}
export function initObservers(entries: unknown[]) {
    const po = new PerformanceObserver((list) => {
        list.getEntries().forEach(
            (entry: PerformanceEntry) => {
                let { startTime, duration, name, entryType } = entry
                startTime = Math.floor(startTime)
                duration = Math.floor(duration)
                let endTime = startTime + duration,
                    briefEntry = { name, endTime, startTime, duration, entryType };
                console.log(briefEntry)
                entries.push(briefEntry)
            })
    })
    const ro = new PerformanceObserver((list) => {
        list.getEntriesByType('resource').forEach((entry) => {
            let { startTime, duration, name, entryType, responseStart, responseEnd, serverTiming, initiatorType } = entry as PerformanceResourceTiming
            if (name.includes('mitm') || name.includes('favicon')) return
            startTime = Math.floor(startTime)
            duration = Math.floor(duration)
            responseEnd = Math.floor(responseEnd)
            responseStart = Math.floor(responseStart)
            if (/^https?:\/\//.test(name)) name = String(name.split('/').pop())
            serverTiming.forEach((entry) => {
                let { name, duration, description } = entry,
                    endTime = Number(description.replace('endtime:', '')),
                    startTime = endTime - duration

                console.log({ name, duration, startTime, entryType: 'server', endTime })
            })
            entries = entries.concat([
                {
                    name: `${initiatorType}:request_sent`,
                    startTime,
                    duration: 0,
                    endTime: startTime,
                    entryType: 'mark'
                },
                {
                    name: `${initiatorType}:response_start`,
                    startTime,
                    duration: responseStart - startTime,
                    endTime: responseStart,
                    entryType: 'resource'
                },
                {
                    name: `${initiatorType}:response_complete`,
                    startTime: responseStart - startTime,
                    duration: responseEnd - responseStart,
                    endTime: responseEnd,
                    entryType: 'resource'
                }
            ])


            console.log(entry.toJSON())



        })

    })

    const listEntries = () => {
        const entriesObj = entries.sort((a, b) => {
            return a.endTime - b.endTime
        }).reduce((accum, entry) => {
            let { name, endTime, startTime, duration, entryType } = entry as TbriefEntry;
            accum[name] = { endTime, startTime, duration, entryType };
            return accum;
        }, {} as { [s: string]: Omit<TbriefEntry, 'name'> })
        window.requestIdleCallback(() => {
            console.table(entriesObj);
            po && po.disconnect()
            ro && ro.disconnect()
        });
    }
    return { ro, po, listEntries }
}