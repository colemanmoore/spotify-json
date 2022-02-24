# spotify-json
Apply changes to a spotify json file

## To Run
```
chmod u+x ./run.js
./run.js
```

## Set up for testing

```
npm install
npm test
```

Run application:

`npm run [path to spotify.json] [path to changes.json] [path to output.json]`

## JSON change commands

See `json/changes.example.json` for an example of a JSON change file with all three supported commands. Any number of commands can be included in the `changes` array of the change file. The commands will be executed in order.

To add an existing song to an existing playlists:

`{ "song_id": "1", "playlist_id": "2" }`

To create a new playlist owned by an existing user:

`{ "user_id": "1", "song_ids": [ "8", "32" ] }`

To delete a playlist:

`{ "playlist_id": "1" }`

## Notes

All values in `changes.json` must be strings (no integer ids).

When creating new playlists, there is potential for collision of playlist ids, if the original spotify.json does not store the playlists in order by id. We could sort them in the constructor of the Spotify class, but the tradeoff would be the output.json not necessarily matching the order of the initial JSON.

The output JSON is formatted with four spaces for new lines. It cannot replicate the format of the initial JSON.

## Scale considerations

Reading the JSON inputs is currently done in a synchronous manner, so larger inputs might cause the whole process to take a very long time. Still, since we are only interested in the final output (not piecemeal updates), then there may be no reason to pursue an asynchronous approach.

This might be changing the requirements, but scaling large libraries of songs, users, and playlists would best be implemented using a database.

## Time

I got a little carried away by doing this with TDD (maybe beyond scope of the prompt :)) and spent about three hours on this project.