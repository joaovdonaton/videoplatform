const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const auth = require('../middleware/auth');

//send all thumbnail/video ids
router.get('/getids', (req, res) => {
    Video.find({}, (err, videos) => {
        let ids = [];
        videos.forEach(video => {
            ids.push(video.id);
        });
        res.json({ids});
    })
});

//send all thumbnail ids of videos uploaded by a certain user
router.get('/getuserthumbs/:username', (req, res) => {
    Video.find({user: req.params.username}, (err, videos) => {
        let ids = [];
        videos.forEach(video => {
            ids.push(video.id);
        });
        res.json({ids});
    })
});

//get specific video thumbnail from id
router.get('/getthumb/:id', (req, res) => {
    res.sendFile(`/thumbnails/${req.params.id}.jpg`, {root: './'});
});

router.post('/search/:text', (req, res) => {
    Video.find({}, (err, videos) => {
        let vids = [];
        videos.forEach(video => {
            if(video.title.includes(req.params.text)){              
                vids.push(video.id)
            }
        })
        res.json({ids: vids})
    })
})

module.exports = router;