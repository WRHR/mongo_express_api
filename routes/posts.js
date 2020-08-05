const express = require('express')
const Post = require('../models/Post')

const router = express.Router();

// Index
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err){
        res.json({message: err})
    }
})

//Show
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.send(post)
    } catch(err){
        res.json({message: err})
    }
})

// Create
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try{
        const savedPost = await post.save()
        res.json(savedPost)
    } catch(err){
        res.json({message: err})
    }
})

// Delete
router.delete('/:id', async (req, res)=> {
    try {
        const removedPost = await Post.remove({_id:req.params.id})
        res.json(removedPost)
    } catch(err){
        res.json({message: err})
    }
})

//Update
router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id:req.params.id }, 
            { $set: { title: req.body.title } }
        )
        res.json(updatedPost)
    } catch(err){
        res.json({message: err})
    }
})


module.exports = router