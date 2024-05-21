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

a.qGetListOrderPatologi = () => ({
    start: null, 
    end: null, 
    noregistrasi: null, 
    taskid: null
})

a.rGetListOrderPatologi = () => ({
    listOrder: []
})

a.qGetIsiOrderPatologi = () => ({
    norec: null
})

a.rGetIsiOrderPatologi = () => ({
    isiOrder: []
})

a.qGetWidgetOrderPatologi = a.qGetListOrderPatologi

a.rGetWidgetOrderPatologi = () => ({
    widget: []
})

const patologiAPI = a


export default patologiAPI

