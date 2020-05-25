# Democracy Bot

A Discord bot to facilitate voting in a clean, customizable fashion.

### Test Cases
/vote "Testing a poll with no emojis" "Option 1" "Option 2" "Option 3"
- [ ] Should create a poll with regional indicators

/vote "Testing a poll with only emojis" (nauseated_face) (joy) (hot_face)
- [ ] Should send an error

/vote "Testing a poll with all custom emojis" "Option 1" (8325_brainlet) "Option 2" (8088_zoomer) "Option 3" (7657_doomer)
- [ ] Should create a poll with the specified emojis

/vote "Testing a poll with all default emojis" "Option 1" (nauseated_face) "Option 2" (joy) "Option 3" (smile)
- [ ] Should create a poll with the specified emojis

/vote "Testing a poll with a variety of options" "Option 1" "Option 2" (smile) "Option 3" (8088_zoomer) "Option 4" "Option 5" (joy)
- [ ] Should create a poll with the specified emojis

/vote "Testing a poll with arguments in the wrong order" (nauseated_face) "Option 1" (joy) "Option 2" (smile) "Option 3"
- [ ] Should send an error

/vote "Testing a poll with incorrect case in emoji qualification" "Option 1" "Option 2" (smile) "Option 3" (8088_zoomer) "Option 4" "Option 5" (Joy) "Option 6" (7657_dOomer)
- [ ] Should send an error

/vote "Testing a poll with incorrect spelling in emoji qualification" "Option 1" "Option 2" (smile) "Option 3" (8088_zoomer) "Option 4" "Option 5" (joi) "Option 6" (7657_dooomer)
- [ ] Should send an error

/vote "Testing a poll that is too big with no custom emojis" "Option 1" "Option 2" "Option 3" "Option 4" "Option 5" "Option 6" "Option 7" "Option 8" "Option 9" "Option 10" "Option 11" "Option 12" "Option 13" "Option 14" "Option 15" "Option 16" "Option 17" "Option 18" "Option 19" "Option 20" "Option 21" "Option 22" "Option 23" "Option 24" "Option 25" "Option 26"
- [ ] Should send a 'too many reactions' error

/vote "Testing a poll that is the maximum size with no custom emojis" "Option 1" "Option 2" "Option 3" "Option 4" "Option 5" "Option 6" "Option 7" "Option 8" "Option 9" "Option 10" "Option 11" "Option 12" "Option 13" "Option 14" "Option 15" "Option 16" "Option 17" "Option 18" "Option 19" "Option 20"
- [ ] Should create a poll with the specified emojis

/vote "Testing a poll that is just over the maximum option limit with no custom emojis" "Option 1" "Option 2" "Option 3" "Option 4" "Option 5" "Option 6" "Option 7" "Option 8" "Option 9" "Option 10" "Option 11" "Option 12" "Option 13" "Option 14" "Option 15" "Option 16" "Option 17" "Option 18" "Option 19" "Option 20" "Option 21"
- [ ] Should send a 'too many reactions' error