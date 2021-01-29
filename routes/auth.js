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
        password: hashedPassword,
    });
    try {
        //CREATE AND ASSIGN TOKEN
        const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET)
        // console.log(user);
        const savedUser = await user.save();
        res.status(200).json({user:savedUser, token: token});
        console.log('it create user...Auth.js')
        
        // res.send({ user: user._id});
    }catch(err){
        res.status(400).send(err)
    }
});

//LOGIN
router.post('/login', async (req, res) => {
   
    //Check if wrong email
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.status(400).json('Email not found');

    //Check if correct password
    const validPass = await bcrypt.compare(req.body.password, foundUser.password);
    if(!validPass) 
    {   
        const myError = 'invalid password';
        //return res.status(400).send('Invalid password');
        return res.status(400).json(myError);
    };
    

    //CREATE AND ASSIGN TOKEN
    const token = jwt.sign({_id: foundUser.id}, process.env.TOKEN_SECRET)
    res.status(200).json({user:foundUser._id, token: token, superUser:foundUser.superUser, UnitInfo: foundUser.unit, bInfo: foundUser.building });
    // console.log(foundUser.superUser)
    //res.header('auth-token', token).send(token); //sending back token
    
})





//router.post('/login')


module.exports = router;