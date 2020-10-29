const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Song } = require("../../db/models");
const SongRepository = require("../../db/song-repository");
const { authenticated, generateToken } = require("./security-utils");
const multer = require("multer");
const upload = multer();

const router = express.Router();

const title = check("title")
  .isLength({ min: 3, max: 50 })
  .withMessage("Song title must be between 3 and 50 characters in length");

const genre = check("genre").exists().withMessage("You must select a genre");

const songUrl = check("songUrl")
  .exists()
  .withMessage("Song url must not be empty");

// AWS
const AWS = require("aws-sdk");
const { awsKeys } = require("../../config");

AWS.config.update({
  secretAccessKey: awsKeys.secretAccessKey,
  accessKeyId: awsKeys.accessKeyId,
  region: awsKeys.region,
}); // update config for s3

const s3 = new AWS.S3(); // constructs a service object

const fileFilter = (req, res, next) => {
  // check for proper mime types
  const file = req.files[0]; //grab first item in the files array (length of 1)
  if (file.mimetype === "audio/mpeg") {
    next();
  } else {
    next({ status: 422, errors: ["Mime Type must be MP3"] });
  }
};

router.post(
  "/",
  upload.any(),
  fileFilter,
  title,
  genre,
  songUrl,
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 422, errors: errors.array() });
    }

    // Get file reference
    const file = req.files[0];

    //create params object for s3
    const params = {
      Bucket: "ss-public-bucket",
      Key: Date.now().toString() + file.originalname, // unique object identifier
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    const uploadObject = s3.upload(params).promise(); // creates a promise from the upload

    const uploadedFile = await uploadObject;
    req.body.songUrl = uploadedFile.Location; // assigns the file url to the request object for later use

    const newSong = await SongRepository.create(req.body);
    await newSong.save();
    res.json({ newSong: newSong.toSafeObject() });
  })
);

router.get(
  "/",
  asyncHandler(async function (_req, res) {
    const songs = await SongRepository.list();
    res.json(songs);
  })
);

router.get("/:id", async function (req, res, next) {
  const song = await SongRepository.one(req.params.id);
  res.json(song);
});

module.exports = router;
