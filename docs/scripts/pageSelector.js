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
	// Set active color
	const highlightTransparentColor = "#0be88160";
	const buttonSidebar = document.getElementsByClassName("button-page-selector-sidebar " + articleType)[0];
	buttonSidebar.style.backgroundColor = highlightTransparentColor;
	buttonSidebar.style.borderWidth = "3px";
}

/* 
 * ######################
 * DROPDOWN
 * ######################
*/

let is_menu_dropdown_open = true;
const dropdown = document.getElementById("div-dropdown");
const buttonMenuDropdown = document.getElementById("button-menu-dropdown");
const image = buttonMenuDropdown.querySelector("img");

function setDropdown(is_open) {
	if (!image) {
		console.error("Failure to query image element for menu dropdown");
	}
	if (is_open) {
		is_menu_dropdown_open = false;
		image.src = "data/close.svg";
		dropdown.classList.add("js-open");
		buttonMenuDropdown.style.width = "2.5rem";
		buttonMenuDropdown.style.height = "2.5rem";
	} 
	else {
		is_menu_dropdown_open = true;
		image.src = "data/hamburger.svg";
		dropdown.classList.remove("js-open");
		buttonMenuDropdown.style.width = "3rem";
		buttonMenuDropdown.style.height = "3rem";
	}
}

function handleButtonMenuDropdownClick() {
	if (is_menu_dropdown_open) {
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
	// Overwrite if argument is DOM element
	if (argument instanceof HTMLElement) argument = ARTICLE.elementToArticleType(argument);
	// Check valid article type
	if (!ARTICLE.isValidArticleType(argument)) {
		console.error("Invalid argument to set article!");
		return;
	}
	// Set article
	let articleType = argument;
	try {
		// Article content
		const article = document.querySelector("article");
		article.innerHTML = await ARTICLE.getArticleHTML(articleType);
		// Sidebar
		setSidebar(articleType);
	} catch (error) {
		console.error("Error setting article content! Error: ", error);
	}
}

/* 
 * ######################
 * ROUTE TODO
 * ######################
*/

function articleTypeToURL(articleType) {
	if (articleType === ARTICLE.ARTICLE_TYPE.WELCOME) return "welcome";
	else if (articleType === ARTICLE.ARTICLE_TYPE.GETTING_STARTED) return "getting-started";
	else if (articleType === ARTICLE.ARTICLE_TYPE.DOCUMENTATION) return "documentation";
	else if (articleType === ARTICLE.ARTICLE_TYPE.BLOG) return "blog";
	else {
		console.error("Failure to convert article type to URL");
		return null;
	}
}

async function route(url) {
	// Overwrite if url is DOM element
	if (url instanceof HTMLElement) url = ARTICLE.elementToArticleType(url);
	// Handle hash syntax
	if (url.startsWith("#")) url = url.substring(1);
	// Handle articleType conversion to URL
	if (ARTICLE.isValidArticleType(url)) {
		url = articleTypeToURL(url);
	}
	// Select page
	if (url.startsWith("getting-started")) {
		await selectPage(ARTICLE.ARTICLE_TYPE.GETTING_STARTED);
	}
	else if (url.startsWith("documentation")) {
		await selectPage(ARTICLE.ARTICLE_TYPE.DOCUMENTATION);
	}
	else if (url.startsWith("blog")) {
		await selectPage(ARTICLE.ARTICLE_TYPE.BLOG);
	}
	else {
		await selectPage(ARTICLE.ARTICLE_TYPE.WELCOME);
	}
	// Update URL
	window.location.hash = url;
}

async function handleButtonPageSelectorClick(event) {
	const buttonPageSelector = event.currentTarget;
	await route(buttonPageSelector);
	// Dropdown
	if (buttonPageSelector.classList.contains("button-page-selector-dropdown")) {
		setDropdown(false);
	}
}

async function handleButtonTitleClick() {
	await route(ARTICLE.ARTICLE_TYPE.WELCOME);
	setDropdown(false);
}

async function handleHashChange() {
	route(window.location.hash);
}

/* 
 * ######################
 * INIT
 * ######################
*/

async function init() {
	// Page selector, sidebar
	const buttonSidebarLeftList = document.getElementsByClassName("button-page-selector-sidebar");
	for (let i = 0; i < buttonSidebarLeftList.length; i++) {
		buttonSidebarLeftList[i].addEventListener("click", handleButtonPageSelectorClick);
	}
	// Page selector, dropdown
	const buttonDropdownList = document.getElementsByClassName("button-page-selector-dropdown");
	for (let i = 0; i < buttonSidebarLeftList.length; i++) {
		buttonDropdownList[i].addEventListener("click", handleButtonPageSelectorClick);
	}
	// Menu dropdown button
	const buttonMenuDropdown = document.getElementById("button-menu-dropdown");
	buttonMenuDropdown.addEventListener("click", handleButtonMenuDropdownClick);
	// Title
	const buttonTitle = document.getElementById("button-title");
	buttonTitle.addEventListener("click", handleButtonTitleClick);
	// Window hashchange
	window.addEventListener("hashchange", handleHashChange);

	// Route new page
	await route(window.location.hash)
}

export { route, init };
