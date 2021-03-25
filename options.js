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

function save_options() {
    chrome.storage.local.set({
        WhiteList: document.getElementById('WhiteList').value,
        RedirectUrl: document.getElementById('RedirectUrl').value
    }, function() {
        chrome.extension.getBackgroundPage().reloadOptions();
        var status = document.getElementById('status');
        status.textContent = 'Options saved!';
        setTimeout(function() {
            status.textContent = '';
        }, 1250);
    });
}

function restore_options() {
    chrome.storage.local.get({'WhiteList':'', 'RedirectUrl':'about:blank'}, function(items) {
        document.getElementById('WhiteList').value = items['WhiteList'];
        document.getElementById('RedirectUrl').value = items['RedirectUrl'];
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
