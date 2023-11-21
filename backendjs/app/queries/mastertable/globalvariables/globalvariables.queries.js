

export const statusEnabled = {
    ALL: "ALL",
    TRUE: "TRUE",
    FALSE: "FALSE"
}

/**
 * 
 * @param {boolean} [semua] 
 * @returns 
 */
export const valueStatusEnabled = (semua) => semua ? 
    [
        {
            label: "Semua",
            value: statusEnabled.ALL
        },
        {
            label: "Aktif",
            value: statusEnabled.TRUE
        },
        {
            label: "Tidak Aktif",
            value: statusEnabled.FALSE
        },
    ] : [
        {
            label: "Aktif",
            value: statusEnabled.TRUE
        },
        {
            label: "Tidak Aktif",
            value: statusEnabled.FALSE
        },
    ]


