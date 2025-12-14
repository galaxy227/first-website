import * as UTILITY from "./utility.js";
import * as ARTICLE from "./article.js";
import * as PAGE_SELECTOR from "./pageSelector.js";

function handleButtonTitleClick() {
	window.location.reload();
	try {
		if (UTILITY.hasSessionStorage()) {
			PAGE_SELECTOR.selectPage(sessionStorage.getItem(ARTICLE.activeArticleKey));
		}
	}
	catch {
		console.error("Failure to load active article from session storage after refresh");
	}
}

export { handleButtonTitleClick };
