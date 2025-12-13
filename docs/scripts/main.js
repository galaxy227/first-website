import * as UTILITY from "./utility.js";
import * as ARTICLE from "./article.js";
import * as MENU_DROPDOWN from "./menuDropdown.js";
import * as TITLE from "./title.js";

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
	// Menu dropdown
	const buttonMenuDropdown = document.getElementById("button-menu-dropdown");
	buttonMenuDropdown.addEventListener("click", MENU_DROPDOWN.handleButtonMenuDropdownClick);
	// Title
	const buttonTitle = document.getElementById("button-title");
	buttonTitle.addEventListener("click", TITLE.handleButtonTitleClick);
}

/* 
 * ######################
 * MAIN
 * ######################
*/

init();
