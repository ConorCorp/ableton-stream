const { GoogleSpreadsheet } = require("google-spreadsheet");
const tmi = require("tmi.js");

require("dotenv").config();

const GOOGLE_SHEET_KEYWORD_PAGE_INDEX = 1; // 2nd Google Sheet
const TWITCH_USERNAME = "dogeeseseegucci"; // 2nd Google Sheet
const TWITCH_APP = "TextAdventure_54321"; // 2nd Google Sheet

const _cleanKeywordsAndSet = (keywords, action, rowsMap) => {
  const keywordsLower = keywords.toLowerCase();
  const splitKeywords = keywordsLower.split(", ");
  const finalAction = action ? action.toLowerCase() : null;
  for (keyword of splitKeywords) {
    rowsMap.set(keyword, finalAction);
  }
};

const getParsedKeywordActionsMap = async (doc) => {
  const sheet1 = doc.sheetsByIndex[GOOGLE_SHEET_KEYWORD_PAGE_INDEX];
  const rows = await sheet1.getRows();
  const rowsMap = new Map();
  for (row of rows) {
    const keywords = row.Keywords;
    _cleanKeywordsAndSet(keywords, row.Action, rowsMap);
  }
  return rowsMap;
};

const _getMatchedCommands = (keywordMap, twitchChatMsg) => {
  const matches = [];
  for (entry of keywordMap.entries()) {
    const keyword = entry[0];
    if (!keyword) continue;
    try {
      if (twitchChatMsg.match(new RegExp(keyword))) {
        matches.push(entry);
      }
    } catch (e) {
      console.error(`ERROR: Cant turn '${keyword}' into regex.`);
    }
  }
  return matches;
};

const connectTwitch = () => {
  const client = new tmi.Client({
    options: { debug: true },
    identity: {
      username: TWITCH_APP,
      password: process.env.TWITCH_TOKEN,
    },
    channels: [TWITCH_USERNAME],
  });
  client.connect();
  return client;
};

const getMatchedCommand = (keywordMap, twitchChatMsg) => {
  // Get only the most recent command. Likely a user made it then.
  const matches = _getMatchedCommands(keywordMap, twitchChatMsg.toLowerCase());
  console.log(`-- Found ${matches.length} matches in text:\n${twitchChatMsg}`);
  matches &&
    console.log(`-- All Matches:\n${JSON.stringify(matches, null, 4)}`);
  const matchedCommand = matches[matches.length - 1] || null;
  matchedCommand && console.log(`-- Command for Max4Live: ${matchedCommand}`);
  return matchedCommand;
};

const runApp = async () => {
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    "1DNoENT4H-c4KjjNYWnegUOXIIrvo3ZamlwGlfm0U3Ss"
  );

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  doc.useApiKey(process.env.GOOGLE_API_KEY);

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(`Google Doc Found: ${doc.title}`);
  const keywordsToActionsMap = await getParsedKeywordActionsMap(doc);
  // console.log(keywordsToActionsMap);

  const client = connectTwitch();

  client.on("message", (channel, tags, twitchChatMsg, self) => {
    console.log("-- Twitch Text");
    console.log(twitchChatMsg);
    const matchedKeywordAndCommandPair = getMatchedCommand(
      keywordsToActionsMap,
      twitchChatMsg
    );
    console.log(matchedKeywordAndCommandPair);
    console.log("----------");
    // TODO: Send righthand side of array (commands to max4live)
    // maxApi.outlet(message);
  });
};

// TODO:s
// Set up twitch
// Make it map to only single word entries, or just split upon matching
// Return a " " separated string

runApp();
