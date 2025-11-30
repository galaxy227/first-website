article_element = document.querySelector("article");

const ARTICLE_TYPE = Object.freeze({
	WELCOME: 0,
	GETTING_STARTED: 1,
	DOCUMENTATION: 2,
	BLOG: 3,
});

activeArticle = ARTICLE_TYPE.WELCOME;

/* 
 * ######################
 * FETCH FILE CONTENT
 * ######################
*/

async function fetchFileContent(filePath) {
	try {
		const response = await fetch(filePath);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const fileContent = await response.text();
		return fileContent;
	} catch (error) {
		console.error("Error fetching file content! Error: ", error);
		return null;
	}
}

(async () => {
	const welcomeHTML = await fetchFileContent("html/welcome.html");
	const gettingStartedHTML = await fetchFileContent("html/getting-started.html");
	const documentationHTML = await fetchFileContent("html/documizer.html");
	const blogHTML = await fetchFileContent("html/blog.html");
})();

/* 
 * ######################
 * SET ARTICLE
 * ######################
*/

function setArticle(article) {
	if (article === ARTICLE_TYPE.WELCOME) {
		article_element.innerHTML = welcomeHTML;
		activeArticle = ARTICLE_TYPE.WELCOME;
	}
	else if (article === ARTICLE_TYPE.GETTING_STARTED) {
		article_element.innerHTML = gettingStartedHTML;
		activeArticle = ARTICLE_TYPE.GETTING_STARTED;
	}
	else if (article === ARTICLE_TYPE.GETTING_STARTED) {
		article_element.innerHTML = documentationHTML;
		activeArticle = ARTICLE_TYPE.DOCUMENTATION;
	}
	else if (article === ARTICLE_TYPE.GETTING_STARTED) {
		article_element.innerHTML = blogHTML;
		activeArticle = ARTICLE_TYPE.BLOG;
	}
	else console.log("Error setting article content!");
}

/* 
 * ######################
 * BUTTONS
 * ######################
*/

// Title
titleButton = document.getElementById("button-title");
titleButton.addEventListener('click', (event) => {
	setArticle(ARTICLE_TYPE.WELCOME);
});
// Welcome
welcomeButton = document.getElementById("button-welcome");
welcomeButton.addEventListener('click', (event) => {
	setArticle(ARTICLE_TYPE.WELCOME);
});
// Getting started
gettingStartedButton = document.getElementById("button-getting-started");
gettingStartedButton.addEventListener('click', (event) => {
	setArticle(ARTICLE_TYPE.GETTING_STARTED);
});
// Documentation
documentationButton = document.getElementById("button-documentation");
documentationButton.addEventListener('click', (event) => {
	setArticle(ARTICLE_TYPE.DOCUMENTATION);
});
// Blog
blogButton = document.getElementById("button-blog");
blogButton.addEventListener('click', (event) => {
	setArticle(ARTICLE_TYPE.BLOG);
});

/* 
 * ######################
 * SIDEBAR RIGHT
 * ######################
*/

buttonSidebarRightList = document.getElementsByClassName("button-sidebar-right");

for (let i = 0; i < buttonSidebarRightList.length; i++) {
	buttonSidebarRightList[i].style.visibility = "hidden";
}

/* 
 * ######################
 * SIDEBAR LEFT
 * ######################
*/

const highlightTransparentColor = "#0be88160";
buttonSidebarLeftList = document.getElementsByClassName("button-sidebar-left");

function handleButtonSidebarLeftClick(event) {
	for (let i = 0; i < buttonSidebarLeftList.length; i++) {
		buttonSidebarLeftList[i].style.backgroundColor = "transparent";
		buttonSidebarLeftList[i].style.borderWidth = "1px";
	}
	event.currentTarget.style.backgroundColor = highlightTransparentColor;
	event.currentTarget.style.borderWidth = "3px";

}

for (let i = 0; i < buttonSidebarLeftList.length; i++) {
	buttonSidebarLeftList[i].addEventListener("click", handleButtonSidebarLeftClick);
	// NOTE Start page with welcome loaded
	if (buttonSidebarLeftList[i].id === "button-welcome") {
		buttonSidebarLeftList[i].click();
	}
}
