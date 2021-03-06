const { Song } = require("./models");
const { User } = require("./models");

async function create(newSong) {
  const artist = await User.findByPk(newSong.creatorId);
  const song = await Song.create(newSong);
  console.log("artist: ", artist);
  return song;
}

async function destroy(songId) {
  const song = await Song.findByPk(songId);
  console.log("song: ", song);
  return await song.destroy();
}

async function list() {
  return await Song.findAll({
    attributes: ["id", "title", "genre", "creatorId", "songUrl"],
    include: [
      {
        model: User,
        as: "artist",
      },
    ],
  });
}

async function one(id) {
  const song = await Song.findByPk(id, {
    include: User,
  });

  return {
    title: song.title,
    genre: song.genre,
    id: song.id,
    creator: {
      id: song.creatorId,
      name: User[id].username,
    },
    url: song.songUrl,
  };
}

module.exports = {
  create,
  list,
  one,
  destroy,
};
