import * as UTILITY from "./utility.js";

/* 
 * ######################
 * MAPS
 * ######################
*/

const ARTICLE_TYPE = Object.freeze({
	WELCOME: "js-page-welcome",
	GETTING_STARTED: "js-page-getting-started",
	DOCUMENTATION: "js-page-documentation",
	BLOG: "js-page-blog",
});

const articlePathDict = Object.freeze({
	[ARTICLE_TYPE.WELCOME]: "html/welcome.html",
	[ARTICLE_TYPE.GETTING_STARTED]: "html/getting-started.html",
	[ARTICLE_TYPE.DOCUMENTATION]: "html/documentation.html",
	[ARTICLE_TYPE.BLOG]: "html/blog.html",
});

const articleHTMLDict = {
	[ARTICLE_TYPE.WELCOME]: undefined,
	[ARTICLE_TYPE.GETTING_STARTED]: undefined,
	[ARTICLE_TYPE.DOCUMENTATION]: undefined,
	[ARTICLE_TYPE.BLOG]: undefined,
};

/* 
 * ######################
 * HELPER
 * ######################
*/

async function getArticleHTML(articleType) {
	if (articleHTMLDict[articleType] === undefined) {
		articleHTMLDict[articleType] = await UTILITY.fetchFileContent(articlePathDict[articleType]);
	}
	return articleHTMLDict[articleType];
}

function isValidArticleType(argument) {
	for (const key in ARTICLE_TYPE) {
		if (Object.prototype.hasOwnProperty.call(ARTICLE_TYPE, key) && ARTICLE_TYPE[key] === argument) {
			return true;
		}
	}
	return false;
}

function elementToArticleType(element) {
	if (element.classList.contains(ARTICLE_TYPE.WELCOME)) return ARTICLE_TYPE.WELCOME;
	else if (element.classList.contains(ARTICLE_TYPE.GETTING_STARTED)) return ARTICLE_TYPE.GETTING_STARTED;
	else if (element.classList.contains(ARTICLE_TYPE.DOCUMENTATION)) return ARTICLE_TYPE.DOCUMENTATION;
	else if (element.classList.contains(ARTICLE_TYPE.BLOG)) return ARTICLE_TYPE.BLOG;
	else {
		console.error("Failure to convert element to article type");
		return undefined;
	}
}

/* 
 * ######################
 * ACTIVE ARTICLE
 * ######################
*/

let activeArticle;
let activeArticleKey = "activeArticle";

function getActiveArticle() {
	if (UTILITY.hasSessionStorage()) {
		return sessionStorage.getItem(activeArticleKey);
	}
	else {
		console.error("Failure to access session storage while attempting to get active article");
		return activeArticle;
	}
}
function setActiveArticle(argument) {
	// Validate argument
	if (isValidArticleType()) {
		console.error("Failure to validate argument while attempting to set active article");
		return;
	}
	// Set active article
	if (UTILITY.hasSessionStorage()) {
		sessionStorage.setItem(activeArticleKey, argument);
	}
	else {
		console.error("Failure to access session storage while attempting to set active article");
	}
	activeArticle = argument;
}

export { ARTICLE_TYPE, getArticleHTML, isValidArticleType, elementToArticleType, getActiveArticle, setActiveArticle };
