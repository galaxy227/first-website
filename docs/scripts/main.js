import * as UTILITY from "./utility.js";
import * as ARTICLE from "./article.js";
import * as PAGE_SELECTOR from "./pageSelector.js";
import * as TITLE from "./title.js";

/* 
 * ######################
 * INIT
 * ######################
*/

function init() {
	// Page selector, sidebar
	const buttonSidebarLeftList = document.getElementsByClassName("button-page-selector-sidebar");
	for (let i = 0; i < buttonSidebarLeftList.length; i++) {
		buttonSidebarLeftList[i].addEventListener("click", PAGE_SELECTOR.handleButtonPageSelectorClick);
	}
	// Page selector, dropdown
	const buttonDropdownList = document.getElementsByClassName("button-page-selector-dropdown");
	for (let i = 0; i < buttonSidebarLeftList.length; i++) {
		buttonDropdownList[i].addEventListener("click", PAGE_SELECTOR.handleButtonPageSelectorClick);
	}
	// Menu dropdown
	const buttonMenuDropdown = document.getElementById("button-menu-dropdown");
	buttonMenuDropdown.addEventListener("click", PAGE_SELECTOR.handleButtonMenuDropdownClick);
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
