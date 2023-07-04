

const formatDateIsoShort = (d) => {
    if(d === null || d === undefined) return null;
    return d.toISOString().replace(/T.*$/, "");
}

module.exports = {
    formatDateIsoShort,
}