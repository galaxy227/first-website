import * as UTILITY from "./utility.js"

/* 
 * ######################
 * LOAD HTML
 * ######################
*/

let welcomeHTML;
let gettingStartedHTML;
let documentationHTML;
let blogHTML;

async function initHTML() {
	welcomeHTML = await UTILITY.fetchFileContent("html/welcome.html");
	gettingStartedHTML = await UTILITY.fetchFileContent("html/getting-started.html");
	documentationHTML = await UTILITY.fetchFileContent("html/documizer.html");
	blogHTML = await UTILITY.fetchFileContent("html/blog.html");
}

/* 
 * ######################
 * SET ARTICLE
 * ######################
*/

let articleElement = document.querySelector("article");
let activeArticle;

const ARTICLE_TYPE = Object.freeze({
	WELCOME: 0,
	GETTING_STARTED: 1,
	DOCUMENTATION: 2,
	BLOG: 3,
});

function setArticle(article) {
	try {
		if (article === ARTICLE_TYPE.WELCOME) {
			articleElement.innerHTML = welcomeHTML;
			activeArticle = ARTICLE_TYPE.WELCOME;
		}
		else if (article === ARTICLE_TYPE.GETTING_STARTED) {
			articleElement.innerHTML = gettingStartedHTML;
			activeArticle = ARTICLE_TYPE.GETTING_STARTED;
		}
		else if (article === ARTICLE_TYPE.DOCUMENTATION) {
			articleElement.innerHTML = documentationHTML;
			activeArticle = ARTICLE_TYPE.DOCUMENTATION;
		}
		else if (article === ARTICLE_TYPE.BLOG) {
			articleElement.innerHTML = blogHTML;
			activeArticle = ARTICLE_TYPE.BLOG;
		}
	} catch (error) {
		console.error("Error setting article content! Error: ", error);
	}
}

/* 
 * ######################
 * SIDEBAR LEFT
 * ######################
*/

const highlightTransparentColor = "#0be88160";

function handleButtonSidebarLeftClick(event) {
	// Reset default color
	const buttonSidebarLeftList = document.getElementsByClassName("button-sidebar-left");
	for (let i = 0; i < buttonSidebarLeftList.length; i++) {
		buttonSidebarLeftList[i].style.backgroundColor = "transparent";
		buttonSidebarLeftList[i].style.borderWidth = "1px";
	}
	// Set active color
	event.currentTarget.style.backgroundColor = highlightTransparentColor;
	event.currentTarget.style.borderWidth = "3px";

	// Set active article
	if (event.currentTarget.id === "button-welcome") setArticle(ARTICLE_TYPE.WELCOME);
	else if (event.currentTarget.id === "button-getting-started") setArticle(ARTICLE_TYPE.GETTING_STARTED);
	else if (event.currentTarget.id === "button-documentation") setArticle(ARTICLE_TYPE.DOCUMENTATION);
	else if (event.currentTarget.id === "button-blog") setArticle(ARTICLE_TYPE.BLOG);
}

export { initHTML, handleButtonSidebarLeftClick };
