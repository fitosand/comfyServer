const router = require('express').Router();
const Post = require('../model/Post');
// const { post } = require('./auth');
const verify = require('./verifyToken');

router.get('/', verify,  async (req, res) => {
    //fetched maintenance data here
    //to get specific user's posts (the one that's logged in)
    
    // res.send(req.user) //this finds the user
    //Post.findOne({_id: req.user}) //this finds the id to that user
    try{
        const foundPosts = await Post.find(); //returns all
        res.json(foundPosts)

    }catch(err){
        res.json({ message: err})
    }

})

router.post('/', async (req,res) => {
    const post = new Post({
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
router.patch('/:postId', async (req,res) => {
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
router.delete('/:postId', async (req,res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    }catch(err){
        res.json({message: err});

    }
});


module.exports = router;