const pool = require('./db')
const response = require('./network/response')
const { permittedDaysFilter } = require('./utils')

exports.getUserPayments = async (req, res, next) => {
    let limit = Number(req.query.limit)
    let page = Number(req.query.page)
    try {
        let countUsers = await pool.query(`SELECT COUNT(id)  AS count FROM clientes`)
        countUsers = countUsers[0][0].count
        limit = limit > countUsers ? countUsers : limit
        const totalPages = countUsers / limit
        const nextPage = page === totalPages ? null : Number(page) + 1
        const offset = page === 0 ? 0 : (countUsers / limit) * page
        const query = `SELECT
                        c.id,
                        CONCAT(c.first_name, " ", c.last_name) AS name,
                        c.email,
                        c.isQuincenal,
                        JSON_ARRAYAGG(JSON_OBJECT("name", p.name, "monthlyPrice", ROUND(p.monthlyPrice, 2))) as platforms,
                        COUNT(p.id) as totalPlatforms,
                        MAX(pr.dateCreated) as lastPaymentDate,
                        ROUND(SUM(pr.amount), 2) as lastPayment
                        FROM suscripciones as s
                        LEFT JOIN plataformas  as p
                        ON s.platformId = p.id
                        LEFT JOIN clientes  as c
                        ON c.id = s.userId
                        LEFT JOIN pagosRecibidos as pr
                        ON pr.userId = c.id WHERE pr.dateCreated = (SELECT MAX(dateCreated) FROM pagosRecibidos WHERE userId = c.id)
                        GROUP BY c.id
                        LIMIT ${limit}
                        OFFSET ${offset};
                        `
        let users = await pool.query(query)
        users = users[0]
        const hollidays = await pool.query('SELECT * FROM diasFeriados')

        users = users.map(user => {
            let nexPayment = 0
            user.platforms.forEach(platform => nexPayment += platform.monthlyPrice)

            const today = new Date()
            let nextPaymentDate = today
            if (user.isQuincenal) {
                if (today.getDate <= 15) {
                    nextPaymentDate = today.setDate(15)
                } else {
                    nextPaymentDate = new Date(today.setFullYear(today.getFullYear(), today.getMonth() + 1, 1))
                }
            } else {
                const lastPaymentDate = new Date(user.lastPaymentDate).getDate()
                if (lastPaymentDate === 15) {
                    nextPaymentDate = new Date(today.setFullYear(today.getFullYear(), today.getMonth() + 1, 15))
                } else {
                    nextPaymentDate = new Date(today.setFullYear(today.getFullYear(), today.getMonth() + 1, 1))
                }
            }

            nextPaymentDate =  permittedDaysFilter(nextPaymentDate, hollidays)
            return {
                ...user,
                nexPayment,
                nextPaymentDate
            }
        })
        if (!users.length) {
            response.error(req, res, 'Sin registros', 404)
        }
        response.success(req, res, { page, nextPage, totalPages, result: users })
    } catch (error) {
        next(error)
    }
}