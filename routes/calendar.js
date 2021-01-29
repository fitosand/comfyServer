const cors = require("cors");
const Events = require('../model/Events');
const router = require('express').Router();
const verify = require('./verifyToken');
// const express = require("express");

// router.use(express.json());
// router.use(cors());


//get specific events for this building
router.get("/events/:bldgName", async (req, res) => {
    //console.log('event saved!')
    try{
        const bldgEvents = await Events.find({ bldgName: req.params.bldgName})
            //res.status(200).json({post:specificPost});
            // res.send.json(specificPost);
            res.status(200).send(bldgEvents);
            console.log(bldgEvents);

    }catch(err){
        res.json({ message: err})
    }

});

//create new event
router.post('/events/new', async (req,res) => {
    // console.log('it is calling this...');
    const event = new Events({
        // title: "POOL",
        // start: "2021-01-12T09:00:00-05:00",
        // end: "2021-01-12T10:00:00-05:00", 
        // user: "123"
        bldgName: req.body.bldgName,
        title: req.body.title,
        start:req.body.start,
        end: req.body.end,
        user: req.body.user
        

    });
    try{
        // console.log('start time:', req.body.start)
        // console.log('end time:', req.body.end)
        
        const savedEvent = await event.save()
        res.json(savedEvent);
        console.log('it worked!')
    
    }
    catch(err){
        res.json({message:err})
        console.log(event);
        console.log('error here...');
    }
    // console.log(req.body);
})

// update event from calendar
router.patch('/:postId', async (req,res) => {
    //find ticket id
    // try{
    
    //     const updatedPost = await Post.updateOne(
    //         { _id: req.params.postId}, 
    //         { $set: { status: req.body.status}}
    //         );
    //         res.json(updatedPost);
    // }
    // catch(err){
    //     res.json({message: err});
    // }
    

});

//Delete Event from calendar
router.delete('/:postId', verify, async (req,res) => {
    // try{
    //     const removedPost = await Post.remove({_id: req.params.postId});
    //     res.json(removedPost);
    // }catch(err){
    //     res.json({message: err});

    // }
});

module.exports = router;
