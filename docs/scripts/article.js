import * as UTILITY from "./utility.js";

const ARTICLE_TYPE = Object.freeze({
	WELCOME: "js-page-welcome",
	GETTING_STARTED: "js-page-getting-started",
	DOCUMENTATION: "js-page-documentation",
	BLOG: "js-page-blog",
});

/* 
 * ######################
 * LOAD HTML
 * ######################
*/

const articlePathDict = Object.freeze({
	[ARTICLE_TYPE.WELCOME]: "html/welcome.html",
	[ARTICLE_TYPE.GETTING_STARTED]: "html/getting-started.html",
	[ARTICLE_TYPE.DOCUMENTATION]: "html/documizer.html",
	[ARTICLE_TYPE.BLOG]: "html/blog.html",
});

const articleHTMLDict = {
	[ARTICLE_TYPE.WELCOME]: undefined,
	[ARTICLE_TYPE.GETTING_STARTED]: undefined,
	[ARTICLE_TYPE.DOCUMENTATION]: undefined,
	[ARTICLE_TYPE.BLOG]: undefined,
};

async function getArticleHTML(articleType) {
	if (articleHTMLDict[articleType] === undefined) {
		articleHTMLDict[articleType] = await UTILITY.fetchFileContent(articlePathDict[articleType]);
	}
	return articleHTMLDict[articleType];
}

/* 
 * ######################
 * ARTICLE
 * ######################
*/

let activeArticleKey = "activeArticle";
let activeArticleType;

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

async function setArticle(argument) {
	// Assume argument is articleType
	let articleType = argument;
	// Overwrite if argument is DOM element
	if (argument instanceof HTMLElement) articleType = elementToArticleType(argument);
	try {
		const article = document.querySelector("article");
		article.innerHTML = await getArticleHTML(articleType);
		activeArticleType = articleType;
		if (UTILITY.hasSessionStorage()) {
			sessionStorage.setItem(activeArticleKey, articleType);
		}
	} catch (error) {
		console.error("Error setting article content! Error: ", error);
	}
}

export { ARTICLE_TYPE, activeArticleType, activeArticleKey, setArticle };
