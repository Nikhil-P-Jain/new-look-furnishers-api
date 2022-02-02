const { createBranch, updateBranch, getBranch, getBranchById, deleteBranch } = require("./branch.service");
module.exports = {
    createBranch: (req, res) => {
        const body = req.body;
        createBranch(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            if (results.affectedRows != 0) {
                return res.status(200).json({
                    success: 1,
                    data: results.affectedRows + " " + "Branch Created Successfully."
                });
            }
        })
    },
    getBranchById: (req, res) => {
        let id = req.params.id;
        getBranchById(id, (err, results) => {
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
    getBranch: (req, res) => {
        getBranch((err, results) => {
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
    updateBranch: (req, res) => {
        const body = req.body;
        updateBranch(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                })
            }
            if (results.affectedRows != 0) {
                return res.status(200).json({
                    success: 1,
                    message: results.affectedRows + " " + 'branch Updated Successfully!'
                })
            }
            return res.status(404).json({
                success: 1,
                message: 'Something went wrong! Please try again!'
            })
        });
    },
    deleteBranch: (req, res) => {
        let id = req.params.id;
        deleteBranch(id, (err, results) => {
            if (results.affectedRows != 0) {
                return res.status(200).json({
                    success: 1,
                    message: results.affectedRows + " " + 'Branch Deleted Successfully!'
                })
            }

            return res.status(404).json({
                success: 1,
                message: 'Something went wrong! Please try again!'
            })
        });
    },

}