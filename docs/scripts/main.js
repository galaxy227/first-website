import * as UTILITY from "./utility.js";
import * as ARTICLE from "./article.js";

/* 
 * ######################
 * INIT
 * ######################
*/

async function init() {
	// Load HTML
	await ARTICLE.initHTML();
	// Left sidebar
	const buttonSidebarLeftList = document.getElementsByClassName("button-sidebar-left");
	for (let i = 0; i < buttonSidebarLeftList.length; i++) {
		buttonSidebarLeftList[i].addEventListener("click", ARTICLE.handleButtonSidebarLeftClick);
	}
	// Init welcome via invoke click event
	const buttonWelcome = document.getElementById("button-welcome");
	buttonWelcome.click();
}

/* 
 * ######################
 * MAIN
 * ######################
*/

await init();
