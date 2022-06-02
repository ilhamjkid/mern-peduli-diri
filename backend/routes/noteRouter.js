const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");
const { protect } = require("../middleware/verifyToken");

router
  .route("/")
  // GET All Notes
  .get(protect, noteController.getNotes)
  // POST Single Note
  .post(protect, noteController.createNote);

router
  .route("/:id")
  // GET Single Note
  .get(protect, noteController.getSingleNote)
  // PUT / Update Note
  .put(protect, noteController.updateNote)
  // DELETE Note
  .delete(protect, noteController.deleteNote);

module.exports = router;
