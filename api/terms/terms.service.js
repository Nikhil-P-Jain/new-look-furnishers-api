const pool = require('../../config/db');
const DATE_FORMATTER = require('dateformat');
module.exports = {
    createTerm: (data, callBack) => {
        var cur = new Date().toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
        created_date = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
        updated_date = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
        pool.query(
            'insert into terms(term_name,term,status,created_date,updated_date) values(?,?,1,?,?)',
            [data.term_name,
            data.term,
                created_date,
                updated_date],
            (error, results, data) => {
                console.log(error, "err")
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            })
    },
    getTerms: callBack => {
        pool.query(
            `select term_id,term_name,term,status,created_date,updated_date from terms`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd = new Date(element.created_date).toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
                    let ud = new Date(element.updated_date).toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
                    element.created_date = DATE_FORMATTER(cd, "yyyy-mm-dd hh:MM:ss");
                    element.updated_date = DATE_FORMATTER(ud, "yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null, results);
            })
    },
    getTermById: (id, callBack) => {
        pool.query(
            `select term_id,term_name,term,status,created_date,updated_date from terms where term_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd = new Date(element.created_date).toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
                    let ud = new Date(element.updated_date).toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
                    element.created_date = DATE_FORMATTER(cd, "yyyy-mm-dd hh:MM:ss");
                    element.updated_date = DATE_FORMATTER(ud, "yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null, results);
            }
        )
    },
    updateTerm: (body, callBack) => {
        var cur = new Date().toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
        updated_date = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update terms set term_name=?,term=?,status=?,updated_date=? where term_id=?`,
            [
                body.term_name,
                body.term,
                body.status,
                updated_date,
                body.term_id
            ],
            (error, results, data) => {
                // console.log(error,results);
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    deleteTerm: (id, callBack) => {
        pool.query(
            `delete from terms where term_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
}
