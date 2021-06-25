const router = require("express").Router();
const { Router } = require("express");
let Student = require("../model/student");

//insert detail

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const newStudent = new Student({
        name,
        age,
        gender
    })
    newStudent.save().then(() => {
        res.json("Student Added")
    }).catch((err) => {
        console.log(err);
    })
})



//read data (get data)

router.route("/").get((req, res) => {
    Student.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err)
    })
})

//Update data

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, age, gender } = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }
    const update = await Student.findByIdAndUpdate(userId, updateStudent).then(() => {
        res.status(200).send({ status: "User Updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating", error: err.message });
    })

})

// delete data

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "user deleted" });
    }).catch((err) => {
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })
})

//get one student data

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Student.findById(userId).then((student) => {
        res.status(200).send({ status: "user fetched", student});
    }).catch((err) => {
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})

module.exports = router;