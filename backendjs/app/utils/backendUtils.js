import * as uuid from 'uuid'
import fs from 'fs';
import path from "path";
import util from 'node:util'
import { unlink } from "node:fs";
import { FileMimeType } from 'sharedjs/src/utils/objectUtils';


const unlinkPromise = util.promisify(unlink)

const __dirname = path.resolve(path.dirname(''));
const pathFolderImage = "./app/media/upload/"
export const folderImage = path.join(__dirname, pathFolderImage)

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

export const hSaveImage = async (tempPath, mimeType, folderName = "") => {
    const norec = uuid.v4().substring(0, 32);
    const extension = FileMimeType[mimeType] ? `.${FileMimeType[mimeType]}` : ""
    const folderDir = path.join(
        folderImage,
        folderName
    );
    if (!fs.existsSync(folderDir)){
        fs.mkdirSync(folderDir, { recursive: true });
    }
    const targetPath = path.join(
        folderDir,
        norec 
        + extension
    );
    
    fs.renameSync(tempPath, targetPath);
    const folderWithSlash = folderName ? (folderName + "/") : folderName
    const data = {
        norec: norec,
        uri: folderWithSlash + norec + extension
    };
    return data 
}

export const hDeleteImage = async (fileName, folderName = "") => {
    const folderImage = "./app/media/upload/"
    const folderDir = path.join(
        folderImage,
        folderName
    );
    const targetPath = path.join(folderDir, fileName);

    try{
        await unlinkPromise(targetPath);
        const data = {
            uri: targetPath,
            error: null,
        };
        return data 
    }catch(e){
        if(e.code === 'ENOENT'){
            const data = {
                uri: null,
                error: e
            };
            return data 
        }
        throw e
    }

}
