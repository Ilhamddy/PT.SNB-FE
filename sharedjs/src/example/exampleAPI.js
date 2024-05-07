/**
 * q: query
 * b: body
 * r: response
 */

const a = {}

a.qGetUsernamePasswordPCare = {}
a.rGetUsernamePasswordPCare = {
    username: '',
    password: ''
},
a.bUpsertUsernamePasswordPCare = { ...a.rGetUsernamePasswordPCare } // response get sama post upsert sama
a.rUpsertUsernamePasswordPCare = {
    username: null,
    password: null
}

const exampleAPI = a

export default exampleAPI