const qGetGlobalVclaim =`select id, s_key, s_value, s_label, statusenabled from s_global sg where s_key ilike '%vclaim%'`
const qGetGlobalIcare =`select id, s_key, s_value, s_label, statusenabled from s_global sg where s_key ilike '%icare%'`

export default{
    qGetGlobalVclaim,
    qGetGlobalIcare
}