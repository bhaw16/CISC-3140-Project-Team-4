class Appointment {
    constructor(date, name) {
        if ((!(date instanceof Date)) || typeof(name) != "string") {
            throw new TypeError();
        }
        this.date = date;
        this.name = name;
    }
}
