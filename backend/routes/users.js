const express = require('express');
var app = express();
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
var path = require('path');
const bcrypt = require("bcrypt");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
})

app.use('../uploads', express.static(path.join(__dirname, '/uploads')));


//get all user
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//create a user
router.post('/', upload.single("drivingLicense"), async (req, res) => {
    console.log(req.body)
    User.findOne
        (
            {
                emailAddress: req.body.emailAddress
            }
        )
        .exec()
        .then(result => {
            console.log(result)
            if (result) {
                console.log("Id Already Exist")
                res.json("Id Already Exists")
            }
            else {
                console.log("Result is null")
                const salt = bcrypt.genSaltSync(10);
                const password = bcrypt.hashSync(req.body.password, salt);
                console.log(req.body)
                if (req.body.admin === true) {
                    console.log("inside admin signup")
                    const user = new User({
                        emailAddress: req.body.emailAddress,
                        password: password,
                        admin: true,
                        manager: false

                    });
                    try {
                        const savedUser = user.save();
                        res.json(savedUser);
                    }
                    catch (err) {
                        res.json({ message: err });
                    }
                }
                else if (req.body.manager === true) {
                    const user = new User({
                        emailAddress: req.body.emailAddress,
                        password: password,
                        manager: true,
                        admin: false

                    });
                    try {
                        const savedUser = user.save();
                        res.json(savedUser);
                    }
                    catch (err) {
                        res.json({ message: err });
                    }
                }
                else {

                    var host = req.hostname;
                    console.log("Hostname", host)
                    console.log("File", req.file)
                    var filepath = req.protocol + "://" + host + ':5000/' + req.file.path;
                    req.body.dlImage = filepath
                    console.log("Req Body", req.body)

                    const user = new User({
                        admin: req.body.admin,
                        manager: req.body.manager,
                        name: req.body.name,
                        password: password,
                        dlImage: req.body.dlImage,
                        emailAddress: req.body.emailAddress,
                        creditCardInfo: req.body.creditCardInfo,
                        residenceAddress: req.body.residenceAddress,
                        phoneNumber: req.body.phoneNumber,
                        isValidated : false

                    });
                    try {
                        const savedUser = user.save();
                        res.json(savedUser);
                    }
                    catch (err) {
                        res.json({ message: err });
                    }
                }

            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
});

//get a specific user 
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//delete a user
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//update a user 
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            {
                $set: {
                    password: req.body.password,
                    emailAddress: req.body.emailAddress,
                    creditCardInfo: req.body.creditCardInfo,
                    residenceAddress: req.body.residenceAddress

                }
            }
        );
        res.json(updatedUser);
    }
    catch (err) {
        req.json({ message: err });
    }
});


//validate user
router.post('/isValid', (req, res) => {
    console.log("req",req.body)
    User.updateOne({
        _id : req.body._id
    },{
        $set : {
            isValidated : req.body.isValidated
        }
    }).exec()
    .then(result =>{
            User.find().exec()
            .then(result => {
                console.log("inside Final")
                res.send(result)
            })
            .catch(err=>{
                res.send(err)
            })
    })
    .catch(err =>{
        res.json({message : err})
    })
});


module.exports = router;
