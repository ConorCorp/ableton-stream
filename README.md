# abletonStream

- conall's code - Original code - Don't need anymore
- twitchListenerApp - The real meat is here. This parses the rules from our google sheet, and listens for twitch messages, then posts them to the max4live server.
- max4LiveServer - Server that should run in Max4live and receive messages from twitchListener app.

## How to use

0. Install [node.js](https://nodejs.org/en/download/) (containing npm).
1. Run the `twitchListenerApp` so we can listen to twitch.
   - In a new terminal/command prompt screen run:
   - Instructions from [./twitchListenerApp/README.md](./twitchListenerApp/README.md)
2. Run the `max4LiveServer` in max4live so it can receive max4live commands.
   - In another new terminal/command prompt screen run:
   - Instructions from [./max4liveServer/README.md](./max4LiveServer/README.md)
3. Test with a twitch message.
