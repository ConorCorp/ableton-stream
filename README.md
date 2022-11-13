# abletonStream

- conall's code - Original code
- twitchListenerApp - App which listens to twitch.
- max4Live Server - server which works in javasciript 1.8 and receives msgs from twitchListenerApp

## How to use

1. Run code in max4liveServer/dist/index.bundle.js inside max4live so it can receive messages and send to max4live.
2. Run code in twitchListenerApp/src/index.js in the terminal with.

   - 2a. Make sure you have your `.env` file in here.

3. Test with a twitch message.

```bash
cd max4liveServer
npm install
npx webpack
npm run runDist #or run in max4live
cd ..

cd twitchListenerApp
npm install
npm run runApp
```
