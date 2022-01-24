const error = (error, statusCode) => {
    const e = new Error(error)
    e.statusCode = statusCode
    return e
}
const permittedDaysFilter = (date, hollidays) => {
    const permittedDays = [false, true, true, true, true, true, false]

    date = new Date(date)

    const isHolliday = hollidays.filter(h => {
        const hDate = new Date(h.fecha)
        return hDate.getDate() === date.getDate() && hDate.getMonth() === date.getMonth()
    })
    const isWeekend = !permittedDays[date.getDay()]

    if (isHolliday.length || isWeekend) {
        date = date.setDate(date.getDate() + 1)
        return permittedDaysFilter(date, hollidays)
    }
    return new Date(date).toISOString()
}


module.exports = {
    error,
    permittedDaysFilter
}