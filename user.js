// ==UserScript==
// @name        SkyMods Helper for Steam Workshop
// @namespace   https://github.com/yvvki/SkyMods-Helper
// @match       *://steamcommunity.com/workshop/filedetails/?id=*
// @match       *://steamcommunity.com/sharedfiles/filedetails/?id=*
// @grant       none
// @version     0.1.0
// @author      Yuuki Rika
// @license     AGPL-3.0-or-later
// @description Easily download collections and items directly from Steam Workshop via smods.ru
// @icon        https://steamcommunity.com/favicon.ico
// ==/UserScript==

/*
 * Copyright (C) 2023  Yuuki Rika
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// This script is inspired by https://github.com/cappig/steam-workshop-downloader

"use strict";

const appid = document
  .querySelector(".apphub_sectionTab")
  ?.getAttribute("href")
  ?.split("/")[4];
const parser = new DOMParser();

var path = ""; // subfolder for collection mods, this only works on firefox, on Chrome it's included in the name

var button; // Store the button so that we don't have to call querySelector() all the time

// Run this on load and inject the HTML download button
(function () {
  button = document.createElement("span"); // global variable

  let icon = button.appendChild(document.createElement("div"));
  let text = button.appendChild(document.createElement("span"));

  text.className = "subscribeText";
  icon.className = "subscribeIcon";
  icon.style.backgroundImage = "linear-gradient(#fff, #aaa)";
  icon.style.maskImage = "url('https://raw.githubusercontent.com/google/material-design-icons/master/symbols/web/download/materialsymbolsoutlined/download_wght500grad200_20px.svg')";
  icon.style.maskRepeat = "no-repeat";
  icon.style.maskPosition = "center";
  icon.style.width = "20px";
  icon.style.left = "5px";

  var fetchFunction;

  if (document.querySelector(".collectionNotifications")) { // Collection
    return; // Add support later

    button.className = "general_btn subscribe";

    text.innerText = "Download all";

    fetchFunction = fetchCollection;

    let name = document.querySelector(".workshopItemTitle")?.innerHTML;
    path = `${name?.replace(/ /g, "_")}/`;
  } else { // Item
    button.className = "btn_green_white_innerfade btn_border_2px btn_medium ";
    button.style.position = "relative";

    text.innerText = "Download\u2003";

    fetchFunction = fetchSingle;
  }

  button.addEventListener("click", fetchFunction);

  let parentNode = document.querySelector("#SubscribeItemBtn")?.parentElement;
  parentNode?.insertBefore(button, parentNode?.lastElementChild);
})();

function fetchSingle() {
  console.debug("Fetching single workshop item");
  // ...
}

function fetchCollection() {
  console.debug("Fetching workshop item collection");
  // ...
}
