const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/Note");

/**
 * @desc    Get All Notes
 * @route   GET /api/notes
 * @access  Private
 */
const getNotes = expressAsyncHandler(async (req, res) => {
  try {
    const notes = await Note.find({ userID: req.user._id });
    res.status(200).json({
      success: true,
      message: "Get all notes successful",
      notes,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/**
 * @desc    Create Single Note
 * @route   POST /api/notes
 * @access  Private
 */
const createNote = expressAsyncHandler(async (req, res) => {
  res.status(400);

  // Check all fields
  const { date, time, location, temperature } = req.body;
  if (!date || !time || !location || !temperature) {
    throw new Error("All fields are required!");
  }

  try {
    // Post data to database
    await Note.create({ userID: req.user._id, date, time, location, temperature });

    // Response successful
    const notes = await Note.find({ userID: req.user._id });
    res.status(201).json({
      success: true,
      message: "Note has been created!",
      notes,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

/**
 * @desc    Update Note
 * @route   PUT /api/notes/:id
 * @access  Private
 */
const updateNote = expressAsyncHandler(async (req, res) => {
  res.status(400);

  // Check all fields
  const { date, time, location, temperature } = req.body;
  if (!date || !time || !location || !temperature) {
    throw new Error("All fields are required!");
  }

  try {
    // Update data from database
    await Note.findOneAndUpdate(
      {
        $and: [{ _id: req.params.id }, { userID: req.user._id }],
      },
      { date, time, location, temperature }
    );

    // Response successful
    const notes = await Note.find({ userID: req.user._id });
    res.status(200).json({
      success: true,
      message: "Note has been updated!",
      notes,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

/**
 * @desc    Delete Note
 * @route   DELETE /api/notes/:id
 * @access  Private
 */
const deleteNote = expressAsyncHandler(async (req, res) => {
  try {
    // Delete data from database
    await Note.findOneAndDelete({
      $and: [{ _id: req.params.id }, { userID: req.user._id }],
    });

    // Response successful
    const notes = await Note.find({ userID: req.user._id });
    res.status(201).json({
      success: true,
      message: "Note has been deleted!",
      notes,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/**
 * @desc    Get Single Note
 * @route   GET /api/notes/:id
 * @access  Private
 */
const getSingleNote = expressAsyncHandler(async (req, res) => {
  try {
    const note = await Note.findOne({
      $and: [{ _id: req.params.id }, { userID: req.user._id }],
    });
    res.status(200).json({
      success: true,
      message: "Get single note successful",
      note,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { getNotes, createNote, updateNote, deleteNote, getSingleNote };
