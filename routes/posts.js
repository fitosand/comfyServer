const router = require('express').Router();
const Post = require('../model/Post');
// const { post } = require('./auth');
const verify = require('./verifyToken');

//get ALL posts (admin)
router.get('/', verify,  async (req, res) => {
    //fetched maintenance data here
    //to get specific user's posts (the one that's logged in)
    
    // res.send(req.user) //this finds the user
    //Post.findOne({_id: req.user}) //this finds the id to that user
    try{
        const foundPosts = await Post.find().sort('-date'); //returns all
        res.json(foundPosts);
        //console.log(foundPosts.length)

    }catch(err){
        res.json({ message: err})
    }

})

//get SPECIFIC post (resident)
router.get('/:userID', verify, async (req, res) => {
    //fetched maintenance data here
    //to get specific user's posts (the one that's logged in)
    
    //res.send(req.user) //this finds the user
    //Post.findOne({_id: req.user}) //this finds the id to that user
    //res.send(req.params.userID);
    try{
        const specificPost = await Post.find({ userID: req.params.userID}).sort('-date');
            //res.status(200).json({post:specificPost});
            // res.send.json(specificPost);
            res.status(200).send(specificPost);
            //console.log(specificPost)

    }catch(err){
        res.json({ message: err})
    }

})

//create new post
router.post('/', verify, async (req,res) => {
    const post = new Post({
        userID:req.body.userID,
        unit: req.body.unit,
        issue: req.body.issue

    });
    try{
    const savedPost = await post.save()
    res.json(savedPost);
    }
    catch(err){
        res.json({message:err})
    }
    //console.log(req.body);
})

// update post
router.patch('/:postId', verify, async (req,res) => {
    //find ticket id
    try{
    
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId}, 
            { $set: { status: req.body.status}}
            );
            res.json(updatedPost);
    }
    catch(err){
        res.json({message: err});
    }
    

});

//Delete Post
router.delete('/:postId', verify, async (req,res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    }catch(err){
        res.json({message: err});

    }
});

module.exports = router;