let mysql = require('mysql');
let express = require('express');
let router = express.Router();
router.use(express.json());

let db = require('./database.js');

router.get('/read', (req, res) => {
    let sql = `SELECT st.*, ft.fac_id, ft.fac_name, dt.dept_id as id FROM sqljoints.student as st
    LEFT JOIN sqljoints.department as  dt ON st.subject = dt.dept_name
    LEFT JOIN sqljoints.faculties as ft ON ft.college = st.college AND ft.dept_id = dt.dept_id`;
    db.query(sql, (err, result) => {
        if(err) {
            return res.send(err);
        }
        return res.send(result);
    });
});

router.post('/student/profile', (req, res) => {
    let {stu_name, classs, subject, college} = req.body;
    let sql = `INSERT INTO student(stu_name, class, subject, college) VALUES(?, ?, ?, ?)`;
    db.query(sql, [stu_name, classs, subject, college], (err, result) => {
        if(err) {
            return res.send(err);
        }
        return res.send(req.body);
    });
});

router.post('/faculties/profile', (req, res) => {
    let {fac_name, dept_id, college} = req.body;
    let sql = `INSERT INTO faculties(fac_name, dept_id, college) VALUES(?, ?, ?)`;
    db.query(sql, [fac_name, dept_id, college], (err, result) => {
        if(err) {
            return res.send(err);
        }
        return res.send(req.body);
    });
});

router.get('/faculties/read/:id', (req, res) => {
    let fac_id = req.params.id;
    let sql = `SELECT * FROM faculties WHERE fac_id = ?`;
    db.query(sql, [fac_id], (err, result) => {
        if(err) { 
            return res.send(err);
        }
        return res.send(result);
    });
});



module.exports = router;