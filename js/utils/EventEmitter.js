class EventEmitter {

    static callbacks = {};

    static on(event, cb) {

        if (!EventEmitter.callbacks[event]) {
            EventEmitter.callbacks[event] = [];
        }

        EventEmitter.callbacks[event].push(cb);
    }

    static emit(event, ...data) {

        let cbs = EventEmitter.callbacks[event];

        if (cbs) {
            cbs.forEach(cb => cb(...data));
        }
    }
}
