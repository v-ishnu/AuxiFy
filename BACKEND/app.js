const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const mongoUrl = "mongodb+srv://vishnuprakash572:HjN3M3n6xwelC3BX@auxify.caita.mongodb.net/?retryWrites=true&w=majority&appName=AuxiFy";

//  Configure DB
mongoose.connect(mongoUrl).then(() => {
    console.log(`Database Connected: ✅ Successfully`);
}).catch((e) => {
    console.log(e);
});

// Import User model
require('./appUserDetails');
const User = mongoose.model("UserInfo");

// Basic health check route
app.get('/', (req, res) => {
    res.send({ status: "Started" });
});

// Register API
app.post('/register', async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
        return res.send({ data: "User already exists" });
    }

    try {
        await User.create({
            name: name,
            email: email,
            mobile: mobile,
            password: password,
        });
        res.send({ status: "Ok", data: "User Created" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
});

app.listen(3001, () => {
    console.log('App is Running');
});
