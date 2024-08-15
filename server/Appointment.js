class Appointment {
    constructor(date, name) {
        if ((!(date instanceof Date)) || typeof(name) != "string") {
            throw new TypeError();
        }
        this.date = date;
        this.name = name;
    }

    toString() {
        return `${this.name} on ${this.date.toLocaleDateString()}`;
    }

    getDateString() {
        return this.date.toLocaleDateString();
    }
}
