# TO DO

- new background colors. Site should have a dark dark gray navbar, and a dark gray main container
- info panels should be slightly light gray boxes.
- maybe do dark green text? something readable, but kinda terminally looking?
- add band model.. it'll be a one-to-many a band can have many users
- add album model, it'll be a one-to-many
- Add Band Repository Section to the band page. It'll load band details, members, and all band songs. Allow sort by album, sort by date added. Have a play album feature that'll automatically play
- songs will need a "private" boolean, which is set to true by default. Only public songs will appear on the public feed. this may need sockets to emit them onto the feed. allow filter by genre.
- songs will need a band_id column, allowing band members to automatically have access to those songs. Songs will need an album_id column, that will allow it to be associated with an album. We'll need an add-to-album action that will show albums to add it to, or allow the creation of a new album. the list of albums to add should then repopulate with the new album, allowing the song to then be added to this new album.
- deleting a song from an album would be deleting (or resetting) a song's album_id field. "remove from album?"
- comments will need sockets, too, and will need to have a timestamp somewhow
- seed users, seed songs with songs from phone
