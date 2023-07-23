import moment from "moment-timezone"

const formatDateIsoShort = (d) => {
    if(d === null || d === undefined) return null;
    return d.toISOString().replace(/T.*$/, "");
}

const saveDate = (date) => {
    if(!(date instanceof Date)) throw new Error("Date must be instance of Date");
    return moment(date).tz("Asia/Jakarta").format();
}

export {
    formatDateIsoShort,
    saveDate
}