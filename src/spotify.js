class Spotify {

    constructor(spotify_json) {
        this.playlists = []
        this.playlistsById = {}
        this.users = []
        this.usersById = {}
        this.songs = []
        this.songsById = {}

        if (spotify_json.users) {
            this.users = [].concat(spotify_json.users.map(user => user.id))
            this.usersById = spotify_json.users.reduce((prev, user) => {
                return {
                    ...prev,
                    [user.id]: { ...user }
                }
            }, {})
        }

        if (spotify_json.playlists) {
            this.playlists = [].concat(spotify_json.playlists.map(playlist => playlist.id))
            this.playlistsById = spotify_json.playlists.reduce((prev, playlist) => {
                return {
                    ...prev,
                    [playlist.id]: { ...playlist }
                }
            }, {})
        }

        if (spotify_json.songs) {
            this.songs = [].concat(spotify_json.songs.map(song => song.id))
            this.songsById = spotify_json.songs.reduce((prev, song) => {
                return {
                    ...prev,
                    [song.id]: { ...song }
                }
            }, {})
        }
    }

    getSong(id) {
        return this.songsById[id]
    }

    getPlaylist(id) {
        return this.playlistsById[id]
    }

    getUser(id) {
        return this.usersById[id]
    }

    addSongToPlaylist({ song_id, playlist_id }) {
        const playlist = this.playlistsById[playlist_id]

        if (!playlist ||
            !this.songsById[song_id] ||
            playlist.song_ids.indexOf(song_id) >= 0) {
            console.warn('Could not add song to playlist')
            return
        }

        playlist.song_ids.push(song_id)
    }

    addNewPlaylist({ user_id, song_ids }) {
        if (!this.usersById[user_id]) {
            return
        }

        const playlist = { id: this.playlists.length, user_id, song_ids: [] }

        for (let song of song_ids) {
            if (this.getSong(song)) {
                playlist.song_ids.push(song)
            }
        }

        if (!playlist.song_ids.length) {
            return
        }

        this.playlists.push(playlist.id)
        this.playlistsById[playlist.id] = playlist
        return playlist.id
    }

    deletePlaylist(id) {
        if (!this.getPlaylist(id)) {
            return
        }

        delete this.playlistsById[id]
        this.playlists = this.playlists.filter(playlistId => playlistId !== id)
    }
}

module.exports = Spotify