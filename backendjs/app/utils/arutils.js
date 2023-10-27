
/**
 * menggrupkan array berdasarkan (key), dan menggabungkan key lainnya (restToJoin)
 * 
 * @example
 * const ar = [
 * {id: 1, name: "a", class: "A"},
 * {id: 2, name: "a", class: "A"},
 * {id: 3, name: "b", class: "B"},
 * {id: 4, name: "b", class: "B"},
 * ]
 * 
 * groupBy(ar, "class", "name")
 * 
 * const hasil = [{
 * class: "A", 
 * name: "a", 
 * values: [
 *  {id: 1, name: "a", class: "A"}, 
 *  {id: 2, name: "b", class: "A"}]
 * },
 * {
 * class: "B",
 * name: "c",
 * values: [
 *  {id: 3, name: "c", class: "B"},
 *  {id: 4, name: "d", class: "B"}]
 * }
 * 
 * @param {any[]} ar array yang ingin digrupkan
 * @param {string | (item: object) => string} key key yang ingin digrupkan
 * @param  {...(string | (item: object) => string)} restToJoin key yang ingin dijoin
 * @returns {any[]} hasil setelah group
 */

export const groupBy = (ar, key, ...restToJoin) =>  { 
    let hasil =  ar.reduce((rv, x) => { 
        let v = key instanceof Function ? key(x) : x[key]; 
        let keyFinal = typeof key === "string" ? key : "key"
        let el = rv.find((r) => r && r[keyFinal] === v); 
        if (el) { 
            el.values.push(x); 
        } else { 
            rv.push({ [keyFinal]: v, values: [x] });
        } return rv; 
    }, [])
    restToJoin.map((rest) => {
        hasil = hasil.map((item) => {
            const newItem = {...item}
            let restV = typeof rest === "string" ? rest : rest(item)
            newItem[restV] = newItem.values?.[0]?.[restV]
            // agar terbalik
            delete newItem.values
            return ({
                ...newItem,
                values: item.values
            })
        })
    })
    return hasil; 
}

export const groupCountBy = (ar, getCount, key, ...restToJoin) =>  {
    const hasilGroupBy = groupBy(ar, key, ...restToJoin)
    return hasilGroupBy.map((item) => {
        let newItem = getCount(item)
        return ({
            ...newItem,
        })
    })
}