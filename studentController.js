const dbConnection = require('../database/connection');

class StudentController {
    constructor () {
        console.log('Student Controller Initialized');
    }

    getStudents () {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM BK_Student;';
            dbConnection.query(query, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    getStudentById (studentId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM BK_Student WHERE id = ?';
            dbConnection.query(
                {
                    sql: query,
                    values: [studentId]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(res);
            });
        });
    }
    getStudentByName (name) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM BK_Student WHERE name = ?';
            dbConnection.query(
                {
                    sql: query,
                    values: [name]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(res);
            });
        });
    }
    addStudent (student) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO BK_Student
                (ID, name, dept_name, tot_cred) VALUES
                (?, ?, ?, ?)
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [student.ID, student.name, student.dept_name, student.tot_cred]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(res);
            });
        });
    }
}

module.exports = StudentController;