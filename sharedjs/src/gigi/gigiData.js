
/**
 * @typedef {{
 *  gigi: number,
 *  gigiTujuan: number | null,
 *  indexGigi: number | null,
 *  indexGigiTujuan: number | null,
 *  line: LeaderLine | null,
 *  isJembatan: boolean,
 *  lokasi: 'atas' | 'bawah' | 'kiri' | 'kanan' | 'tengah' | 'gigiutuh' | null,
 *  lokasitemp: 'atas' | 'bawah' | 'kiri' | 'kanan' | 'tengah' | null,
 *  isFull: boolean,
 *  tglTambah: Date | null
 *  kondisi: any,
 *  svgKondisi: string | null,
 *  warnaKondisi: string | null,
 *  isTumpuk: boolean
 * }} IKondisiGigi
 */

/**
 * @typedef {{
 *  norecodontogram: string | null,
 *  norecap: string | null,
 *  kondisiGigi: IKondisiGigi[],
 * }} IUpsertKondisi
 */





/**
 * @type {IKondisiGigi}
 */
export const initKondisiGigi = {
    gigi: null,
    gigiTujuan: null,
    indexGigi: null,
    indexGigiTujuan: null,
    line: null,
    isJembatan: false,
    lokasi: null,
    lokasitemp: null,
    tglTambah: null,
    isFull: false,
    kondisi: null,
    svgKondisi: null,
    warnaKondisi: null,
    teksKondisi: null,
    isTumpuk: false,
}
