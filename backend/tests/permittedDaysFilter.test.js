const pool = require('../db')
const { permittedDaysFilter } = require('../utils')


describe('give one date that', () => {
    it('is saturday', async () => {
        const hollidays = await pool.query('SELECT * FROM diasFeriados')
        const result = permittedDaysFilter("Jan 22, 2022", hollidays[0])
        expect(result).toBe("2022-01-24T06:00:00.000Z")
    })
    it('is holliday', async () => {
        const hollidays = await pool.query('SELECT * FROM diasFeriados')
        const result = permittedDaysFilter("Sep 16 2022", hollidays[0])
        expect(result).toBe("2022-09-19T05:00:00.000Z")
    })
    it('is weekend and holliday', async () => {
        const hollidays = await pool.query('SELECT * FROM diasFeriados')
        const result = permittedDaysFilter("May 01 2022", hollidays[0])
        expect(result).toBe("2022-05-02T05:00:00.000Z")
    })
    it('isnt weekend day and holliday', async () => {
        const hollidays = await pool.query('SELECT * FROM diasFeriados')
        const result = permittedDaysFilter("Jan 19 2022", hollidays[0])
        expect(result).toBe("2022-01-19T06:00:00.000Z")
    })
})

