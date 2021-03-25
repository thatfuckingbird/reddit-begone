/*
reddit begone
Copyright (C) 2021  thatfuckingbird

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

let whitelist;
let redirUrl;

function reloadOptions() {
    chrome.storage.local.get({'WhiteList': '', 'RedirectUrl': 'about:blank'}, function(items) {
        whitelist = [];
        let tmpWlSplit = items.WhiteList.trim().split('\n');
        for(let i = 0; i < tmpWlSplit.length; ++i)
        {
            let n = tmpWlSplit[i].trim().toLowerCase();
            if(n.length > 0) whitelist.push(n);
        }
        redirUrl = items.RedirectUrl;
    });
}

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, { urls: ['*://reddit.com/r/*','*://*.reddit.com/r/*'] }, ['blocking', 'extraHeaders'])

function onBeforeRequest(details) {
    if(checkUrlForCancer(details.url)) return { redirectUrl: redirUrl }
    return { redirectUrl: details.url };
}

function checkUrlForCancer(url) {
    for(let i = 0; i < whitelist.length; ++i) if(url.toLowerCase().indexOf("reddit.com/r/"+whitelist[i]) != -1) return false;
    return true;
}

reloadOptions();
