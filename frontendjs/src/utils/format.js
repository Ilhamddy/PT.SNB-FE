import { rgxAllComma, rgxAllPeriods, rgxNegative, rgxValidNumberNeg, rgxValidNumberPos, rgxZeroStarts } from "./regexcommon"
import { useEffect, useState } from "react"

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

export const useDate = () => {
    const locale = 'id-ID';
    const [today, setDate] = useState(new Date());
  
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);
  
    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const tanggal = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}`;
  
    const hour = today.getHours();
    const ucapan = `Selamat ${(hour < 12 && 'Pagi') || (hour < 17 && 'Sore') || 'Malam'}, `;
  
    const waktu = today.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' })
        .replace(/\./g,':') ;
  
    return {
        tanggal,
        waktu,
        ucapan,
    };
};


export const dateLocal = (date) => {
    try{
        return new Date(date)
            .toLocaleDateString("id-ID", 
                            { weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        }) 
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

/**
 * 
 * @param {string | number} string 
 * @returns {number}
 */
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
    if(rgxValidNumberPos.test(val)){
        return strNumber(val)
    }
    return valueBefore
}

/**
 * tambahkan titik kepada number isi string
 * @returns 
 */
export const onChangeStrNbrNeg = (value, valueBefore) => {
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
    val = val === "-" ? "0" : val
    if(rgxValidNumberNeg.test(val)){
        return strNumber(val)
    }
    return valueBefore
}