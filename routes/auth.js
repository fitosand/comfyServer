const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

//REGISTER
router.post('/register', async (req, res) => {

    //check if user is already on db
    const emailExist = await User.findOne({
        email:req.body.email
    });
    if (emailExist) return res.status(400).send('Email already exists');

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
        // name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id});
    }catch(err){
        res.status(400).send(err)
    }
});

//LOGIN
router.post('/login', async (req, res) => {

    //Check if wrong email
    const foundUser = await User.findOne({ email: req.body.email });
        if (!foundUser) return res.status(400).send('Email not found');
    //Check if correct password
    const validPass = await bcrypt.compare(req.body.password, foundUser.password);
    if(!validPass) 
    {
        const Herror = 'invalid password';
        //return res.status(400).send('Invalid password');
        return res.status(400).header('error', Herror).send(Herror);
    };

    //Create and assign token
    const token = jwt.sign({_id: foundUser._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token); //sending back token
    //res.send('Logged In!')
})





//router.post('/login')


module.exports = router;