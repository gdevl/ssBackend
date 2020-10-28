const { Song } = require("./models");
const { User } = require("./models");

async function create(newSong, User) {
  newSong.creatorId = User.id;
  const song = await Song.create(newSong);
  return song.id;
}

async function list() {
  return await Song.findAll({
    attributes: ["id", "title", "genre", "creatorId", "songUrl"],
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
};