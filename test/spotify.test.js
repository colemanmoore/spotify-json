const Spotify = require('../src/spotify.js')
const input = require('../json/spotify.example.json')

let spotify

beforeEach(() => {
    spotify = new Spotify(input)
})

test('It should create a Spotify instance', () => {
    expect(spotify.users.length).toEqual(input.users.length)
    expect(spotify.users[0]).toEqual(input.users[0].id)
    expect(spotify.usersById[input.users[0].id]).toBeDefined()
    expect(spotify.playlists.length).toEqual(input.playlists.length)
    expect(spotify.playlists[0]).toEqual(input.playlists[0].id)
    expect(spotify.songs.length).toEqual(input.songs.length)
    expect(spotify.songs[0]).toEqual(input.songs[0].id)
})

test('It should add an existing song to an existing playlist', () => {
    const song_id = spotify.songs[0]
    const playlist_id = spotify.playlists[0]
    const expectedSongs = [...input.playlists[0].song_ids, song_id]
    spotify.addSongToPlaylist({ song_id, playlist_id })
    expect(spotify.getPlaylist(playlist_id).song_ids).toEqual(expectedSongs)
})

test('It should add a new playlist to a user', () => {
    const user_id = spotify.users[0]
    const song_ids = spotify.songs
    const playlist_id = spotify.addNewPlaylist({ user_id, song_ids })
    expect(spotify.playlists.indexOf(playlist_id)).toBeGreaterThan(-1)
    expect(spotify.getPlaylist(playlist_id).song_ids).toEqual(song_ids)
})

test('It should delete a playlist', () => {
    const playlist_id = spotify.playlists[0]
    spotify.deletePlaylist(playlist_id)
    expect(spotify.getPlaylist(playlist_id)).not.toBeDefined()
    expect(spotify.playlists.indexOf(playlist_id)).toBeLessThan(0)
})

test('It should output new json', () => {
    
})