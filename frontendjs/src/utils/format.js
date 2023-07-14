import { rgxAllPeriods, rgxValidNumber, rgxZeroStarts } from "./regexcommon"


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

export const dateISOString = (date) => {
    try{
        return new Date(date)
            .toISOString()
            .split("T")[0]
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

export const strNumber = (nbrStr) => {
    if(nbrStr === "" || nbrStr === null || nbrStr === undefined) return ""
    return Number(nbrStr).toLocaleString("id-ID")
}

export const onChangeStrNbr = (value, valueBefore) => {
    let val = value.replace(rgxAllPeriods, "")
    val = val === "00" ? "0" : val.length > 1 ? val.replace(rgxZeroStarts, "") : val
    if(rgxValidNumber.test(val)){
        return strNumber(val)
    }
    return valueBefore
}