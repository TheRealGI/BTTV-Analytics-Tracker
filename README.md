# BTTV-Analytics-Tracker
A Twitch Bot which can track the usage of BTTV emotes in your chat!
Give the viewers and yourself the power to check the most used emotes per user or over the whole channel.
To get a understanding what the bot can do refer to the [Command List](#commands)

# How to setup the bot on your own
TODO

# Commands

| Command          | Arguments                            | Output                                                                                        | Access            |
|------------------|:------------------------------------:| ----------------------------------------------------------------------------------------------| ------------------|
|[!track](#track)            |                                      | The user will be tracked of there bttv emotes usage                                           | Viewer and higher |
|[!untrack](#untrack)          |                                      | The user will be no longer tracked of there bttv emotes usage                                 | Viewer and higher |
|[!mytopemotes](#mytopemotes)      |                                      | Delivers the top 3 used emote of the user                                                     | Viewer or higher  |
|[!trackedemotes](#trackedemotes)    |                                      | Delivers all tracked emotes of the channel                                                    | Mods or higher    |
|[!channeltopemotes](#channeltopemotes) |                                      | Delivers all used emotes in the channel ordered by the most used to the least one.            | Broadcaster only  |
|[!refresh](#refresh)          |                                      | Sync the tracked emotes with BTTV. Adds missing and removes deleted bttv emotes               | Broadcaster only  |
|[!refresh](#refresh)          | BTTVUserId e.g !refresh 1234         | Set's the userId for importing the emotes from BTTV. Used first before the regular command    | Broadcaster only  |
|[!reset](#reset)            |                                      | Deletes all tracked data from all tracked user of the channel                                 | Broadcaster only  |

**Other**

Use only this commands if the refresh command does not work or you don't want to sync with bttv. Instead use the [refresh command](#refresh )

| Command          | Arguments                            | Output                                                                                        | Access            |
|------------------|:------------------------------------:| ----------------------------------------------------------------------------------------------| ------------------|
|[!addemote](#addemote)         | emoteName e.g !addEmote KEKW         | Adds a bttv emote for the tracking                                                            | Mods or higher    |
|[!removeemote](#removeemote)      | emoteName e.g !removeEmote KEKW      | Removes a bttv emote from the tracking                                                        | Mods or higher    |

## !track

Using **!track** command will add you to the tracking list. This means all message you write in this channel you used the command will be scanned by the bot. We do not save the messages! We save only your userId, used emote and how many times you used it. 

## !untrack

Using **!untrack** command will remove you from the tracking list. The bot will ignore all you message you made and therefore won't keep track on your usage of the bttv emotes.

## !mytopemotes

Using **!mytopemotes** command will displays your top 3 used bttv emote with the corresponding count in chat.

## !trackedemotes

Using **!trackedemotes** will displays all bttv emotes which are tracked on the channel. Be aware that multiple messages will be send to the chat depending on how many there are.

## !channeltopemotes

Using the **!channeltopemotes** will display all used emotes  of the channel from the most used down to the least used one. Keep in mind that the count is sum up by all viewers which has the tracking activated once.

## !refresh 

Using the **!refresh** command will sync the tracked emotes with bttv. But before using this command you need to provide the bttvUserId.
Just use **!refresh [your Bttv UserId]** command to add it. This is needed to get the bttv emotes from your channel.

### Getting the BTTV UserId 

1. Go to [BTTV](https://betterttv.com/) with your Twitch account you use to stream!
2. Open up the developer console by pressing the key **F12** or by right clicking the page and choose inspect
3. Go to the tab **Network** and filter it to **Fetch/XHR**.
4. Now click on **Dashboard** at the  [BTTV](https://betterttv.com/) page
5. In the developer console is a new entry. Choose preview and copy the id. (This is your bttv user id)

## !reset

Using the **!reset** command will delete all tracked data from all viewers of your channel. This means also that [!mytopemotes](#mytopemotes) and [!channeltopemotes](#channeltopemotes) will be reseted as well starting from 0 again. 

## !addemote

Use **!addemote** command only if you don't want to sync with bttv by using the [!refresh command](#refresh) or you want to add it manually.

To add a emote to the tracking list use !addEmote [theEmoteYouWantToAdd] for e.g !addEmote KEKW. When successfull the bot will reply.

## !removeemote

Use **!removeemote** command only if you don't want to sync with bttv by using the [!refresh command](#refresh) or you want to remove it manually.

To remove a emote from the tracking list use **!removeEmote [theEmoteYouWantToRemove]** for e.g !removeEmote KEKW. When successfull the bot will reply.

# The MIT License (MIT)

Copyright (c) 2021 Dominic Gilomen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
