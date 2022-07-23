# Democracy Bot
A Discord bot to facilitate voting in a clean, customizable fashion.

---
This bot is not deployed anywhere, to run, you would need to download the code, authorize an instance of the bot with your own key, add it to a server, and host locally.

---
### Further Development Goals
#### High Priority
- [x] **Properly set up bot permissions so that it can safely delete messages from a server.**
- [ ] **Create, or find, an alternative to the 'emoji-name-map' npm package.** 'emoji-name-map' uses the 'emojilib' npm package which only uses one alias per emoji, in Discord many emojis have more than one alias and 'emojilib' does not recognize alternate aliases.
- [ ] **Replace `emojiTable` constant defined to implement regional indicators.**
- [x] **Improve message error response.** Instead of just sending an error back to the the poll request, delete the poll the request and send the error to the user in a DM. In the original channel, it should look like nothing ever happened, but the user that typed a poll request will receive a DM with the error.
#### Moderate Priority
- [ ] **Improve poll response clarity.** Enable to the bot the edit message anytime someone reacts to a poll in order to record who voted for what.
- [ ] **Refine message response conditions in DM channels.** Currently, any message sent via DM will result in the bot sending back the default "help" response. Ideally it would only send the "help" response if a user asked for help, and may send other (currently non-existant) responses if a user says something else.
#### Low Priority
- [ ] **Create and implement a build/deploy pipeline.**
- [ ] **Add directory for development project goals that go more in-depth on issues/features.**
- [ ] **Pull "help" and "error" text out of config.json and put it somewhere else.**
- [ ] **Add the functionality for polls to have a "majority goal" and when enough votes to form a majority have been triggered on an option the bot will announce a "winner".**
---
### Test Cases (Success)
/vote "Testing a poll with no emojis" "Option 1" "Option 2" "Option 3"
- [ ] Should create a poll with regional indicators

/vote "Testing a poll with all default emojis" "Option 1" (nauseated_face) "Option 2" (joy) "Option 3" (smile)
- [ ] Should create a poll with the specified emojis

/vote "Testing a poll that is the maximum size with no custom emojis" "Option 1" "Option 2" "Option 3" "Option 4" "Option 5" "Option 6" "Option 7" "Option 8" "Option 9" "Option 10" "Option 11" "Option 12" "Option 13" "Option 14" "Option 15" "Option 16" "Option 17" "Option 18" "Option 19" "Option 20"
- [ ] Should create a poll with the specified emojis

### Test Cases (Error)
/vote "Testing a poll with only emojis" (nauseated_face) (joy) (hot_face)
- [ ] Should send an error

/vote "Testing a poll with arguments in the wrong order" (nauseated_face) "Option 1" (joy) "Option 2" (smile) "Option 3"
- [ ] Should send an error

/vote "Testing a poll that is too big with no custom emojis" "Option 1" "Option 2" "Option 3" "Option 4" "Option 5" "Option 6" "Option 7" "Option 8" "Option 9" "Option 10" "Option 11" "Option 12" "Option 13" "Option 14" "Option 15" "Option 16" "Option 17" "Option 18" "Option 19" "Option 20" "Option 21" "Option 22" "Option 23" "Option 24" "Option 25" "Option 26"
- [ ] Should send a 'too many reactions' error

/vote "Testing a poll that is just over the maximum option limit with no custom emojis" "Option 1" "Option 2" "Option 3" "Option 4" "Option 5" "Option 6" "Option 7" "Option 8" "Option 9" "Option 10" "Option 11" "Option 12" "Option 13" "Option 14" "Option 15" "Option 16" "Option 17" "Option 18" "Option 19" "Option 20" "Option 21"
- [ ] Should send a 'too many reactions' error
