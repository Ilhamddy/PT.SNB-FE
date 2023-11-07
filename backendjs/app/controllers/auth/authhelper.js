import bcrypt from "bcryptjs"
import db from "../../models"
import { Op } from "sequelize"
import captcha from 'svg-captcha'

const m_pasien = db.m_pasien


export const initCaptcha = {
    uuid: "",
    answer: "",
    expired: new Date(),
}
  
export let tempCaptcha = []
export const setTempCaptcha = (nTempCaptcha) => {
    tempCaptcha = nTempCaptcha
}

export const pasienSignup = async (
    req, 
    res, 
    transaction, 
    {
        norm: nocm,
        noidentitas
    }) => {
    const userSignup = await m_pasien.findOne({
        where: {
            [Op.or]: [{
                nocm: nocm,
            }, {
                nocmtemp: nocm
            }]
        },
        transaction: transaction

    })
    if(!userSignup) return null
    const password = bcrypt.hashSync(noidentitas, 8)
    const userPasien = await db.users_pasien.create({
            norm: nocm,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastAccessed: null
        },
        {
            transaction: transaction
        }
    )
    return userPasien
}

export const pasienChangeNoIdentitas = async (
    req, 
    res, 
    transaction, 
    {
        norm,
        noidentitas
    }) => {
    const userSignup = m_pasien.findOne({
        where: {
            id: norm
        }
    })
    if(!userSignup) return null
    const password = bcrypt.hashSync(noidentitas, norm.toString())
    const userPasien = await db.users_pasien.create({
            norm: norm,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastAccessed: null
        },
        {
            transaction: transaction
        }
    )
    return userPasien
}

export const hCheckCaptcha = (uuid, answer) => {
    tempCaptcha = tempCaptcha.filter(f => f.expired > new Date())
    const captcha = tempCaptcha.find(f => f.uuid === uuid )
    if(captcha){
      if(captcha.answer === answer){
        tempCaptcha = tempCaptcha.filter(f => f.uuit !== uuid)
        return {correct: true, code: 200}
      }
      return {correct: false, code: 403}
    } else{
      return {correct: false, code: 401}
    }
  }