import  * as ARTICLE from "./article.js";

/* 
 * ######################
 * SIDEBAR
 * ######################
*/

function setSidebar(articleType) {
	// Reset default color
	const buttonSidebarLeftList = document.getElementsByClassName("button-page-selector-sidebar");
	for (let i = 0; i < buttonSidebarLeftList.length; i++) {
		buttonSidebarLeftList[i].style.backgroundColor = "transparent";
		buttonSidebarLeftList[i].style.borderWidth = "1px";
	}
	// Set active color TODO
	const highlightTransparentColor = "#0be88160";
	const buttonSidebar = document.getElementsByClassName("button-page-selector-sidebar " + articleType)[0];
	if (!buttonSidebar) console.error("Footjob now!");
	buttonSidebar.style.backgroundColor = highlightTransparentColor;
	buttonSidebar.style.borderWidth = "3px";
}

/* 
 * ######################
 * DROPDOWN
 * ######################
*/

let is_hamburger = true;
const dropdown = document.getElementById("div-dropdown");
const buttonMenuDropdown = document.getElementById("button-menu-dropdown");
const image = buttonMenuDropdown.querySelector("img");

function setDropdown(is_open) {
	if (!image) {
		console.error("Failure to query image element for menu dropdown");
	}
	if (is_open) {
		is_hamburger = false;
		image.src = "data/close.svg";
		dropdown.classList.add("js-open");
		buttonMenuDropdown.style.width = "2.5rem";
		buttonMenuDropdown.style.height = "2.5rem";
	} 
	else {
		is_hamburger = true;
		image.src = "data/hamburger.svg";
		dropdown.classList.remove("js-open");
		buttonMenuDropdown.style.width = "3rem";
		buttonMenuDropdown.style.height = "3rem";
	}
}

function handleButtonMenuDropdownClick() {
	if (is_hamburger) {
		setDropdown(true);
	}
	else {
		setDropdown(false);
	}
}

/* 
 * ######################
 * PAGE SELECTOR
 * ######################
*/

async function selectPage(argument) {
	// Argument is DOM element
	if (argument instanceof HTMLElement) {
		await ARTICLE.setArticle(argument);
		setSidebar(ARTICLE.activeArticleType);
	}
	// Argument is articleType
	else {
		await ARTICLE.setArticle(argument);
		setSidebar(argument);
	}
}

async function handleButtonPageSelectorClick(event) {
	const buttonPageSelector = event.currentTarget;
	await selectPage(buttonPageSelector);
	// Dropdown
	if (buttonPageSelector.classList.contains("button-page-selector-dropdown")) {
		setDropdown(false);
	}
}

export { handleButtonMenuDropdownClick, selectPage, handleButtonPageSelectorClick };
