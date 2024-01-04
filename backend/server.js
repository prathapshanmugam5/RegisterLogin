const express = require('express');
const db = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyparser.json());
app.use(cors()); // Use cors middleware to enable CORS

db.connect('mongodb://localhost:27017/details', {
    family: 4
});

db.connection.on('error', console.error.bind(console, "error throw while connecting to db"));

db.connection.once('open', () => {
    console.log('db connected');
});

const Student = db.model('list', new db.Schema({
    username: String,
    password: String,
    age: Number,
    gender: String,
    mobile: Number
}));

app.post('/post', async (req, res) => {
    var { username, password, age, gender, mobile } = req.body;
    const pass = await bcrypt.hash(password, 10);
    var password = pass;

    const stu = {
        username,
        password,
        age,
        gender,
        mobile
    };
    const lists = await new Student(stu).save();

    res.send(lists);
});

app.post('/login', async (req, res) => {
    const { username, password, mail } = req.body;

    try {
        const user = await Student.findOne({username });
        console.log(user);

        if (user) {
            const pass = await bcrypt.compare(password, user.password);

            if (username === user.username && pass) {
                console.log("Success");
                res.status(200).json({ message: "Login Success", user });
            } else {
                console.log("Invalid password");
                res.status(401).json({ message: "Invalid Password" });
            }
        } else {
            console.log("User not found");
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: "Login Error" });
    }
});

app.listen(3000);
