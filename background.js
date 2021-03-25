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

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs) {
        checkTabForCancer(tabs[0]);
    });
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs) {
        checkTabForCancer(tabs[0]);
    });
})

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs) {
        checkTabForCancer(tabs[0]);
    });
})

function checkTabForCancer(tab) {
    if(tab.url.toLowerCase().indexOf("reddit.com/r/") != -1 || /.*reddit.com\/?/.test(tab.url.toLowerCase())) {
        chrome.storage.local.get({'WhiteList': '', 'RedirectUrl': 'about:blank'}, function(items) {
            var whitelist = items.WhiteList.trim().split('\n');
            for(let i = 0; i < whitelist.length; ++i)
            {
                let subreddit_name = whitelist[i].trim().toLowerCase();
                if(subreddit_name.length > 0 && tab.url.toLowerCase().indexOf("reddit.com/r/"+subreddit_name) != -1) return;
            }
            chrome.tabs.update(tab.id, {url: items.RedirectUrl});
        });
    }
}
