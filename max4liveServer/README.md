# max4liveServer

Server that should run in Max4live and receive messages from twitchListener app.

Should work with Javascript 1.8. Should run in max4live.

Basically just a web server. Receives messages from `twitchListenerApp` and sends to max4live.

## Running

```bash
npm install
npx webpack # This will spit out a lot of crap but if it says, something like: "webpack 5.75.0 compiled with 2 warnings in 3701 ms" we're good
npm run runDist # This needs to be done in Max4Live.
```
