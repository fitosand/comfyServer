const cors = require("cors");
const Subscriptions = require("../model/Subs");
const router = require('express').Router();
const verify = require('./verifyToken');
// const express = require("express");

// router.use(express.json());
// router.use(cors());


//get specific events for this building ('api/subs/123')
router.get("/:userID", async (req, res) => {
    console.log('sub checked!')
    // try{
    //     const bldgEvents = await Subscriptions.find({ bldgName: req.params.bldgName})
            
    //         res.status(200).send(bldgEvents);
    //         console.log(bldgEvents);

    // }catch(err){
    //     res.json({ message: err})
    // }

});

//add new sub
router.post('/new', async (req,res) => {
    const sub = new Subscriptions({
        userID:req.body.userID,
        subType: req.body.subType

    });
    try{
    const savedSub= await sub.save()
    res.json(savedSub);
    }
    catch(err){
        res.json({message:err})
    }
    
})

// update sub (unsubscribe)
router.patch('/subs/:userId/type', async (req,res) => {
    try{
        
        //find and update 02/02/2021
        await Subscriptions.findOneAndUpdate({
            userID: req.body.userID
        },{
            windClean:true
        })
        //02/02/2021 ends

        const savedSub = await sub.save()
        res.json(savedSub);
        console.log('it worked!')
    
    }catch(err){
        res.json({message:err})
    }
    

});

module.exports = router;
