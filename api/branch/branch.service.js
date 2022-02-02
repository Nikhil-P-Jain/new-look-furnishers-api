const pool = require('../../config/db');
const DATE_FORMATTER = require('dateformat');
module.exports = {
    createBranch: (data, callBack) => {
        var cur = new Date().toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
        pool.query(
            `insert into branch(branch_name,branch_address,city_id,header,footer,status) values(?,?,?,?,?,1)`,
            [
                data.branch_name,
                data.branch_address,
                data.city_id,
                data.header,
                data.footer
            ],
            (error, results, data) => {
                console.log(error, "err")
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            })
    },
    getBranch: callBack => {
        pool.query(
            `select b.branch_name,b.branch_address,b.header,b.footer,b.status,b.city_id,c.city_name from branch b join city c on b.city_id=c.city_id`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                // results.forEach(element => {
                //     let cd = new Date(element.product_created_date).toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
                //     let ud = new Date(element.product_updated_date).toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
                //     element.product_created_date = DATE_FORMATTER(cd, "yyyy-mm-dd hh:MM:ss");
                //     element.product_updated_date = DATE_FORMATTER(ud, "yyyy-mm-dd hh:MM:ss");
                // });
                return callBack(null, results);
            })
    },
    getBranchById: (id, callBack) => {
        pool.query(
            `select branch_name,branch_address,city_id,header,footer,status from branch where branch_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateBranch: (body, callBack) => {
        pool.query(
            `update branch set branch_name=?,branch_address=?,city_id=?,header=?,footer=?,status=? where branch_id=?`,
            [
                body.branch_name,
                body.branch_address,
                body.city_id,
                body.header,
                body.footer,
                body.status,
                body.branch_id
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
    deleteBranch: (id, callBack) => {
        pool.query(
            `delete from branch where branch_id=?`,
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
