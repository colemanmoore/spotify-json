const Spotify = require('./spotify.js')

function process(inputJSON, changesJSON) {
    const spotify = new Spotify(inputJSON)

    for (let command of changesJSON.changes) {

        if (command.playlist_id && !command.song_id) {
            spotify.deletePlaylist(command.playlist_id)
            continue
        }

        if (command.song_id && command.playlist_id) {
            spotify.addSongToPlaylist(command)
            continue
        }

        if (command.user_id && command.song_ids) {
            spotify.addNewPlaylist(command)
            continue
        }
    }

    return spotify.toJSON()
}

module.exports = { process }