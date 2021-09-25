# Twitch-Emote-Analytics-Tracker
A Twitch Bot which can track the usage of Twitch emotes ([FFZ](https://www.frankerfacez.com/emoticons/), [BTTV](https://betterttv.com/) ) in your chat!
Give the viewers and yourself the power to check the most used emotes per user or over the whole channel.
To get a understanding what the bot can do refer to the [Command List](#commands)

# How to setup the bot on your own
Comming soon!

# Commands

| Command          | Arguments                            | Output                                                                                        | Access            |
|------------------|:------------------------------------:| ----------------------------------------------------------------------------------------------| ------------------|
|[!track](#track)     |                                   | The user will be tracked of there Twitch emotes usage                                           | Viewer and higher |
|[!untrack](#untrack) |                                   | The user will be no longer tracked of there Twitch emotes usage                                 | Viewer and higher |
|[!mytopemotes](#mytopemotes)      |                      | Delivers the top 3 used emote of the user                                                     | Viewer and higher |
|[!help](#help) |                                         | Delivers a link to this documentation in twitch chat                                          | Viewer and higher |
|[!trackedemotes](#trackedemotes)    |                    | Delivers all tracked emotes of the channel                                                    | Mods or higher    |
|[!addemote](#addemote) | emoteName e.g !addEmote KEKW         | Add a custom emote which are not in [FFZ](https://www.frankerfacez.com/emoticons/) or [BTTV](https://betterttv.com/)                                          | Mods or higher    |
|[!removeemote](#removeemote)      | emoteName e.g !removeEmote KEKW      | Removes a custom emote                                                        | Mods or higher    |
|[!channeltopemotes](#channeltopemotes) |                 | Delivers all used emotes in the channel ordered by the most used to the least one.            | Broadcaster only  |
|[!setbttvuserid](#setbttvuserid) |  e.g !setbttvuserid 1234   | Set's the mandatory userId for importing emotes from [BTTV]((https://betterttv.com/))                                 | Broadcaster only  |
|[!setffzuserid](#setffzuserid) |    e.g !setffzuserid zezima  | Set's the mandadory userId for importing emotes from [FFZ](https://www.frankerfacez.com/emoticons/)           | Broadcaster only  |
|[!refresh](#refresh)          |                          | Sync the tracked emotes with [BTTV](https://betterttv.com/) and [FFZ](https://www.frankerfacez.com/emoticons/). Adds missing and removes deleted emotes            | Broadcaster only  |
|[!reset](#reset)            |                            | Deletes all tracked data from all tracked user of the channel                                 | Broadcaster only  |  

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

## !setbttvuserid 
Does set the value for importing emotes from your BTTV Channel. The provided value is the technical userId. Follow the instruction below to retrieve this id.

### Getting the BTTV UserId 

1. Go to [BTTV](https://betterttv.com/) with your Twitch account you use to stream!
2. Open up the developer console by pressing the key **F12** or by right clicking the page and choose inspect
3. Go to the tab **Network** and filter it to **Fetch/XHR**.

 ![Step 3](https://github.com/TheRealGI/BTTV-Analytics-Tracker/blob/main/img/dev_console.PNG)
 
5. Now click on **Dashboard** at the  [BTTV](https://betterttv.com/) page
6. In the developer console is a new entry. Choose preview and copy the id. (This is your bttv user id)

 ![Step 6](https://github.com/TheRealGI/BTTV-Analytics-Tracker/blob/main/img/dev_console_detail.PNG)


## !setffzuserid 
Does set the value for importing emotes from your FFZ channel. The provided value is the account name on FFZ.

## !refresh 

Using the **!refresh** command will sync the tracked emotes with BTTV and FFZ.
However you need to first set some values before using this command successfully.
There are currently two sources integrated. BTTV and FFZ. If you want to get one or both of this sources and you have a channel there then refer to this commands
[!setBttvUserId](#setbttvuserid) or [!setffzuserid](#setffzuserid).


## !reset

Using the **!reset** command will delete all tracked data from all viewers of your channel. This means also that [!mytopemotes](#mytopemotes) and [!channeltopemotes](#channeltopemotes) will be reseted as well starting from 0 again. 

## !addemote

Use **!addemote** command only if you don't want to sync with bttv by using the [!refresh command](#refresh) or you want to add it manually.

To add a emote to the tracking list use !addEmote [theEmoteYouWantToAdd] for e.g !addEmote KEKW. When successfull the bot will reply.

## !removeemote

Use **!removeemote** command only if you don't want to sync with bttv by using the [!refresh command](#refresh) or you want to remove it manually.

To remove a emote from the tracking list use **!removeEmote [theEmoteYouWantToRemove]** for e.g !removeEmote KEKW. When successfull the bot will reply.

## !help

Bot responses to Twitch chat with a link to this documentation.

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
