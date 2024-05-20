/**
 * q: query
 * b: body
 * r: response
 * v: validation
 */

const a = {}

a.qGetHistoriPatologi = () => ({
    norecdp: '',
})

a.rGetHistoriPatologi = () => ({
    histori: []
})

const patologiAPI = a


export default patologiAPI

