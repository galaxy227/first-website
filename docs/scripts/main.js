import * as UTILITY from "./utility.js";
import * as ARTICLE from "./article.js";
import * as PAGE_SELECTOR from "./pageSelector.js";
import * as TITLE from "./title.js";

/* 
 * ######################
 * INIT
 * ######################
*/

async function init() {
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

	// Load active article
	try {
		let activeArticle;
		if (UTILITY.hasSessionStorage()) {
			activeArticle = sessionStorage.getItem(ARTICLE.activeArticleKey);
			if (activeArticle) await PAGE_SELECTOR.selectPage(activeArticle);
		}
		if (!activeArticle) await PAGE_SELECTOR.selectPage(ARTICLE.ARTICLE_TYPE.WELCOME);
	}
	catch (error) {
		console.error("Failure to load active article from session storage after refresh:\n" + error);
	}
}

/* 
 * ######################
 * MAIN
 * ######################
*/

init();
