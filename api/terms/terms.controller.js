const { createTerm, updateTerm, getTerms, getTermById, deleteTerm } = require("./terms.service");
module.exports = {
    createTerm: (req, res) => {
        const body = req.body;
        createTerm(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            if (results.affectedRows != 0) {
                return res.status(200).json({
                    success: 1,
                    data: results.affectedRows + " " + "Term Created Successfully."
                });
            }
        })
    },
    getTermById: (req, res) => {
        let id = req.params.id;
        getTermById(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length == 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Record Doesn't Exist!!"
                })
            }
            return res.status(200).json({
                success: 1,
                data: { results }
            })
        });
    },
    getTerms: (req, res) => {
        getTerms((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length == 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Record Doesn't Exist!!"
                })
            }
            return res.status(200).json({
                success: 1,
                data: { results }
            })
        });
    },
    updateTerm: (req, res) => {
        const body = req.body;
        updateTerm(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                })
            }
            if (results.affectedRows != 0) {
                return res.status(200).json({
                    success: 1,
                    message: results.affectedRows + " " + 'term Updated Successfully!'
                })
            }
            return res.status(404).json({
                success: 1,
                message: 'Something went wrong! Please try again!'
            })
        });
    },
    deleteTerm: (req, res) => {
        let id = req.params.id;
        deleteTerm(id, (err, results) => {
            if (results.affectedRows != 0) {
                return res.status(200).json({
                    success: 1,
                    message: results.affectedRows + " " + 'term Deleted Successfully!'
                })
            }

            return res.status(404).json({
                success: 1,
                message: 'Something went wrong! Please try again!'
            })
        });
    },

}