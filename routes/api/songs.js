const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Song } = require("../../db/models");
const SongRepository = require("../../db/song-repository");
const { authenticated, generateToken } = require("./security-utils");

const router = express.Router();

const title = check("title")
  .isLength({ min: 3, max: 50 })
  .withMessage("Song title must be between 3 and 50 characters in length");

const genre = check("genre").exists().withMessage("You must select a genre");

const songUrl = check("songUrl")
  .exists()
  .withMessage("Song url must not be empty");

router.get(
  "/",
  asyncHandler(async function (_req, res) {
    const songs = await SongRepository.list();
    res.json(songs);
  })
);

router.post(
  "/",
  title,
  genre,
  songUrl,
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 422, errors: errors.array() });
    }

    const newSong = await SongRepository.create(req.body);
    await newSong.save();
    res.json({ newSong: newSong.toSafeObject() });
  })
);

router.get("/:id", async function (req, res, next) {
  const song = await Song.findByPk(req.params.id);
  res.json(song);
});

module.exports = router;
