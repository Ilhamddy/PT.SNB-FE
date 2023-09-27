import bcrypt from "bcryptjs"
import db from "../../models"

const m_pasien = db.m_pasien

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
            nocm: nocm,
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