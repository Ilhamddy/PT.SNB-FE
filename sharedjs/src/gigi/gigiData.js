
/**
 * @typedef {{
 *  gigi: number,
 *  gigiTujuan: number | null,
 *  labelgigi: string | null,
 *  labelgigitujuan: string | null,
 *  idkuadran: number | null,
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
 *  reportDisplay: string,
 *  isTumpuk: boolean
 * }} IKondisiGigi
 */


/**
 * @type {IKondisiGigi}
 */
export const initKondisiGigi = {
    gigi: null,
    gigiTujuan: null,
    labelgigi: null,
    labelgigitujuan: null,
    idkuadran: null,
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
    reportDisplay: '',
    isTumpuk: false,
}
