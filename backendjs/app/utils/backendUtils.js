import * as uuid from 'uuid'
import fs from 'fs';
import path from "path";

/**
 * @template V
 * @param {V} initial 
 * @returns {V}
 */
export const processQuery = (q, initial) => {
    let data = initial ? initial : q
    const keys = Object.keys(q)
    for(let key of keys){
        data[key] = (q[key] === "null" || q[key] === "") ? null : q[key]
    }
    return data
}


/**
 * @template V
 * @param {V} initial 
 * @returns {V}
 */
export const processBody = (b, initial) => {
    let data = initial ? initial : b
    data = JSON.parse(JSON.stringify(b))
    return data
}

export const hSaveImage = async (tempPath, originalName, folderName = "") => {
    const __dirname = path.resolve(path.dirname(''));
    const folderImage = "./app/media/upload/"
    const fileName = uuid.v4().substring(0, 32);
    const extension = path.extname(originalName).toLowerCase()
    const folderWithSlash = folderName ? (folderName + "/") : folderName
    const targetPath = path.join(__dirname,
        folderImage, 
        folderWithSlash
        + fileName 
        + extension
    );
    
    fs.renameSync(tempPath, targetPath);
    const data = {
        uri: folderWithSlash + fileName + extension
    };
    return data 
}