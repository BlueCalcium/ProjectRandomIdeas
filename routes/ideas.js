const express = require('express');
const Idea = require('../models/Idea');

const router = express.Router();

// This is just here for reference. It's not used anywhere else.
const ideas = [
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
];

// GET - Get all ideas.
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find(); // This returns all Idea documents in the connected MDB DB. This is basically acting like a static method.
    res.json({ 
      success: true,
      data: ideas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong.'});
  }
});

// GET - Get single idea based on ID.
router.get('/:id', async (req, res) => {
  // req.params.id gets you the value in :id in the request to this route.
  
  try {
    const idea = await Idea.findById(req.params.id);
    console.log(idea);
    res.json({ 
      success: true,
      data: idea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong.' })
  }
});

// POST - Add a new idea.
router.post('/', async (req, res) => {
  // This creates a new Idea "object" from the Mongoose Schema using our object as an argument.
  const idea = new Idea({
    // ID is automatically handled by MongoDB.
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    // We do not need to specify a date as we set the default in Idea.js to be the current date.
    // date: new Date().toISOString().slice(0, 10),
  })

  try {
    const savedIdea = await idea.save(); // This saves our newly created Idea "object" to our MDB DB and returns a promise which seems to either contain or outright also be a JSON object of the new Idea.
    res.json({ success: true, data: savedIdea })
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong.' })
  }
});

// PUT - Update an idea.
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // Match the usernames.
    if (idea.username === req.body.username) {
      // It seems findByIdAndUpdate() returns a promise that is also the JSON object of the Idea that got updated after being updated.
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id, 
        // This object are the properties of the object in the database that are being set to new values.
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag
            // Note: If parameters like req.body.text aren't passed in via PUT request, it seems like Mongoose leaves the old value as is instead of setting it to an empty one.
          }
        },
        // These are a set of additional parameters.
        {
          new: true // I think setting this to true means that you return the updated updatedIdea from findByIdAndUpdate instead of the pre-update one.
        }
      );
      return res.json({ 
        success: true,
        data: updatedIdea,
      });
    }

    // Usernames do not match.
    res.status(403).json({ success: false, error: 'You are unauthorized to update this resource.' });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong.' });
  }
});

// DELETE - Deletes a single idea based on an ID.
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // Match the usernames.
    if (idea.username === req.body.username) {
      // It seems findByIdAndDelete() returns a promise that is also the JSON object of the Idea that got deleted.
      const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
      return res.json({
        success: true,
        data: {}
        // data: deletedIdea
      });
    }

    // Usernames do not match.
    res.status(403).json({ success: false, error: 'You are unauthorized to delete this resource.' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong.' });
  }
});

module.exports = router;