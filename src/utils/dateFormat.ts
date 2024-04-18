export const dateFormat = async (date:string) => {
    const dateStr = new Date(date);
    const formatter = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium", 
        timeStyle : "short",
    })
    return formatter.format(dateStr)
}