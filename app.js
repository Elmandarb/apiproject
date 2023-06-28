const demoController = new (require('./controller/demoController'))();
const studentController = new (require('./controller/studentController'))(); 
const DepartmentController = new (require('./controller/departmentController'))();
async function demo() {
    try {
        let result = await demoController.getDatabases();
        if(result.length > 0) {
            console.log("BK_Tables Exists");
        }
    } catch (e) {
        console.log(`You BK_ Tables might be missing!: ${e.sqlMessage}`);
    }
}
async function createDepartment(department) {
    try {
        let result = await DepartmentController.getDepartmentByName(department.name);
        if (result.length > 0) {
            console.log(`${department.name} already exists`);
        
        }
        else {
            let done = await DepartmentController.addDepartment(department);
            if(done) {
                let depInfo = await DepartmentController.getDepartmentByName(department.name);
                console.log(depInfo[0]);
            }
        }

    }
    catch (e){
            console.log(e);
    }
}
async function getStudentRecord(name) {
    try {
        let result = await studentController.getStudentByName(name);
        for(let student of result) {
            console.log(`Student Record for ${student.ID} - ${student.name}`);
            let dept = await DepartmentController.getDepartmentByName(student.dept_name);
            console.log(`   Department: ${dept[0].dept_name}
   Home Building: ${dept[0].building}
   Total Credits: ${student.tot_cred}`);
        }
    } catch (e) {
        console.log(`No student with that name: ${e.sqlMessage}`);
    }
}
(async function main() {
    let input = parseInt(process.argv[2]); // cast to int
    console.log(`Your input was: ${input}`);

    switch (input) {
        case 0:
            // Demo: Check for BK_ Tables in your database
            await demo();
            break;
        case 1:
            // Fetching Data
            let studentName = process.argv[3];
            console.log(`Your argument was: ${studentName}`);
            await getStudentRecord(studentName);
            break;
        case 2:
            // Posting Data
            let department = process.argv[3];
            department = JSON.parse(department);
            console.log(`Your argument was: ${department}`);
            await createDepartment(department);
            break;
        default:
            console.log("Connection Successful: Welcome to HW3!");
            break;
    }

    process.exit(0);
})();