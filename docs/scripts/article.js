import * as UTILITY from "./utility.js"

const ARTICLE_TYPE = Object.freeze({
	WELCOME: "WELCOME",
	GETTING_STARTED: "GETTING_STARTED",
	DOCUMENTATION: "DOCUMENTATION",
	BLOG: "BLOG",
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
 * SET ARTICLE
 * ######################
*/

let articleElement = document.querySelector("article");
let activeArticleKey = "activeArticle";

async function setArticle(articleType) {
	try {
		articleElement.innerHTML = await getArticleHTML(articleType);
		if (UTILITY.hasSessionStorage()) {
			sessionStorage.setItem(activeArticleKey, articleType);
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

function elementToArticleType(element) {
	if (element.classList.contains("button-welcome")) return ARTICLE_TYPE.WELCOME;
	else if (element.classList.contains("button-getting-started")) return ARTICLE_TYPE.GETTING_STARTED;
	else if (element.classList.contains("button-documentation")) return ARTICLE_TYPE.DOCUMENTATION;
	else if (element.classList.contains("button-blog")) return ARTICLE_TYPE.BLOG;
	else console.error("Failure to convert element to article type");
}

async function handleButtonSidebarLeftClick(event) {
	// Reset default color
	const buttonSidebarLeftList = document.getElementsByClassName("button-sidebar-left");
	for (let i = 0; i < buttonSidebarLeftList.length; i++) {
		buttonSidebarLeftList[i].style.backgroundColor = "transparent";
		buttonSidebarLeftList[i].style.borderWidth = "1px";
	}
	// Set active color
	const highlightTransparentColor = "#0be88160";
	event.currentTarget.style.backgroundColor = highlightTransparentColor;
	event.currentTarget.style.borderWidth = "3px";

	// Set article
	await setArticle(elementToArticleType(event.currentTarget));
}

export { handleButtonSidebarLeftClick };
