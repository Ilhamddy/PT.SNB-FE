import { rgxAllComma, rgxAllPeriods, rgxValidNumber, rgxZeroStarts } from "./regexcommon"


export const dateTimeLocal = (date) => {
    try{
        return new Date(date)
            .toLocaleDateString("id-ID", 
                            { weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        }) 
                        + 
                        " " 
                        +
            new Date(date)
            .toLocaleTimeString("id-ID", {hour: '2-digit', minute: '2-digit'})
    }catch(e){
        return ""
    }

}


export const dateTimeISOString = (date) => {
    try{
        return new Date(date)
        .toISOString()
    }catch(e){
        return ""
    }
}

export const strToNumber = (string) => {
    if(string === "" || string === null || string === undefined) return 0
    if(typeof string === "number") {
        return string
    }
    if(typeof string !== "string") {
        throw new Error("parameter harus bertipe string atau number")
    }
    let newString = string
    newString 
        = newString.replace(rgxAllPeriods, "")
    newString
        = Number(newString.replace(rgxAllComma, "."))
    return newString
}

export const strNumber = (nbrStr) => {
    if(nbrStr === "" || nbrStr === null || nbrStr === undefined) return ""
    const nbrAwal = nbrStr.split(".")[0]
    const nbrDesimal = nbrStr.split(".")[1]
    const isAdaKoma = nbrDesimal || nbrDesimal === ""
    return Number(nbrAwal).toLocaleString("id-ID") 
        + (isAdaKoma ? "," + nbrDesimal : "")
}

/**
 * tambahkan titik kepada number isi string
 * @returns 
 */
export const onChangeStrNbr = (value, valueBefore) => {
    if(typeof value === "number") {
        let val = value
            .toLocaleString("id-ID", {maximumFractionDigits: 10})
        val = val.replace(rgxAllPeriods, "")
        val = val.replace(rgxAllComma, ".")
        return strNumber(val)
    }
    let val = value.replace(rgxAllPeriods, "")
    val = val.replace(rgxAllComma, ".")
    val = val === "00" ? "0" : val.length > 1 ? val.replace(rgxZeroStarts, "") : val
    if(rgxValidNumber.test(val)){
        return strNumber(val)
    }
    return valueBefore
}