const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();

const _cleanKeywordsAndSet = (keywords, action, rowsMap) => {
  const keywordsLower = keywords.toLowerCase();
  const splitKeywords = keywordsLower.split(", ");
  const finalAction = action ? action.toLowerCase() : null;
  for (keyword of splitKeywords) {
    rowsMap.set(keyword, finalAction);
  }
};

const getParsedKeywordActionsMap = async (doc) => {
  const sheet1 = doc.sheetsByIndex[0];
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
  const keywordMap = await getParsedKeywordActionsMap(doc);
  // console.log(keywordMap);

  // Maybe stick this one a 1 second loop
  const twitchChatMsg = "haha i hate jazz fuck"; // TODO: Add get sentence from twitch.
  const matchedCommand = getMatchedCommand(keywordMap, twitchChatMsg);
  console.log("----------");

  // TODO: Send righthand side of array (commands to max4live)
};

runApp();
