# Democracy Bot
A Discord bot to facilitate voting in a clean, customizable fashion.
---
### Further Development Goals
#### High Priority
- [x] **Properly set up bot permissions so that it can safely delete messages from a server.**
- [ ] **Create, or find, an alternative to the 'emoji-name-map' npm package.** 'emoji-name-map' uses the 'emojilib' npm package which only uses one alias per emoji, in Discord many emojis have more than one alias and 'emojilib' does not recognize alternate aliases.
- [ ] **Replace `emojiTable` constant defined to implement regional indicators.**
- [ ] **When a user types a poll query that triggers an error, instead of sending an error back to the channel, delete the message and send the user a DM with the error.**
#### Moderate Priority
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

/vote "Testing a poll with all custom emojis" "Option 1" (8325_brainlet) "Option 2" (8088_zoomer) "Option 3" (7657_doomer)
- [ ] Should create a poll with the specified emojis

/vote "Testing a poll with all default emojis" "Option 1" (nauseated_face) "Option 2" (joy) "Option 3" (smile)
- [ ] Should create a poll with the specified emojis

/vote "Testing a poll with a variety of options" "Option 1" "Option 2" (smile) "Option 3" (8088_zoomer) "Option 4" "Option 5" (joy)
- [ ] Should create a poll with the specified emojis

/vote "Testing a poll that is the maximum size with no custom emojis" "Option 1" "Option 2" "Option 3" "Option 4" "Option 5" "Option 6" "Option 7" "Option 8" "Option 9" "Option 10" "Option 11" "Option 12" "Option 13" "Option 14" "Option 15" "Option 16" "Option 17" "Option 18" "Option 19" "Option 20"
- [ ] Should create a poll with the specified emojis

### Test Cases (Error)
/vote "Testing a poll with only emojis" (nauseated_face) (joy) (hot_face)
- [ ] Should send an error

/vote "Testing a poll with arguments in the wrong order" (nauseated_face) "Option 1" (joy) "Option 2" (smile) "Option 3"
- [ ] Should send an error

/vote "Testing a poll with incorrect case in emoji qualification" "Option 1" "Option 2" (smile) "Option 3" (8088_zoomer) "Option 4" "Option 5" (Joy) "Option 6" (7657_dOomer)
- [ ] Should send an error

/vote "Testing a poll with incorrect spelling in emoji qualification" "Option 1" "Option 2" (smile) "Option 3" (8088_zoomer) "Option 4" "Option 5" (joi) "Option 6" (7657_dooomer)
- [ ] Should send an error

/vote "Testing a poll that is too big with no custom emojis" "Option 1" "Option 2" "Option 3" "Option 4" "Option 5" "Option 6" "Option 7" "Option 8" "Option 9" "Option 10" "Option 11" "Option 12" "Option 13" "Option 14" "Option 15" "Option 16" "Option 17" "Option 18" "Option 19" "Option 20" "Option 21" "Option 22" "Option 23" "Option 24" "Option 25" "Option 26"
- [ ] Should send a 'too many reactions' error

/vote "Testing a poll that is just over the maximum option limit with no custom emojis" "Option 1" "Option 2" "Option 3" "Option 4" "Option 5" "Option 6" "Option 7" "Option 8" "Option 9" "Option 10" "Option 11" "Option 12" "Option 13" "Option 14" "Option 15" "Option 16" "Option 17" "Option 18" "Option 19" "Option 20" "Option 21"
- [ ] Should send a 'too many reactions' error