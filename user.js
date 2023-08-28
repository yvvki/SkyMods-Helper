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

/**
 * Subfolder for collection. Only works on firefox, on Chrome it's included in the name
 */
var path = "";

/**
 * Global button variable to reduce `querySelector()` calls
 * @type {HTMLSpanElement}
 */
var button,
/** @type {HTMLDivElement} */
    buttonIcon,
/** @type {HTMLSpanElement} */
    buttonText;

// Run this on load and inject the HTML download button
(function () {
  // Global variables
  button = document.createElement("span");
  buttonIcon = button.appendChild(document.createElement("div"));
  buttonText = button.appendChild(document.createElement("span"));

  buttonText.className = "subscribeText";
  buttonIcon.className = "subscribeIcon";
  buttonIcon.style.backgroundImage = "linear-gradient(#fff, #aaa)";
  buttonIcon.style.maskImage = "url('https://raw.githubusercontent.com/google/material-design-icons/master/symbols/web/download/materialsymbolsoutlined/download_wght500grad200_20px.svg')";
  buttonIcon.style.maskRepeat = "no-repeat";
  buttonIcon.style.maskPosition = "center";
  buttonIcon.style.width = "20px";
  buttonIcon.style.left = "5px";

  var fetchFunction;

  if (document.querySelector(".collectionNotifications")) { // Collection
    return; // Add support later

    button.className = "general_btn subscribe";

    buttonText.innerText = "Download all";

    fetchFunction = fetchCollection;

    let name = document.querySelector(".workshopItemTitle")?.innerHTML;
    path = `${name?.replace(/ /g, "_")}/`;
  } else { // Item
    button.className = "btn_green_white_innerfade btn_border_2px btn_medium ";
    button.style.position = "relative";

    buttonText.innerText = "Download\u2003";

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
