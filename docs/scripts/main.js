import * as UTILITY from "./utility.js";
import * as ARTICLE from "./article.js";

/* 
 * ######################
 * INIT
 * ######################
*/

function init() {
	// Left sidebar
	const buttonSidebarLeftList = document.getElementsByClassName("button-page-selector-sidebar");
	for (let i = 0; i < buttonSidebarLeftList.length; i++) {
		buttonSidebarLeftList[i].addEventListener("click", ARTICLE.handleButtonSidebarLeftClick);
	}
}

/* 
 * ######################
 * MAIN
 * ######################
*/

init();
