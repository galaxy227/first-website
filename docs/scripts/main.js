article_element = document.querySelector("article");

/* 
 * ######################
 * ASIDE RIGHT
 * ######################
*/

buttonAsideRightList = document.getElementsByClassName("button-aside-right");

for (let i = 0; i < buttonAsideRightList.length; i++) {
	buttonAsideRightList[i].style.visibility = "hidden";
}

/* 
 * ######################
 * ASIDE LEFT
 * ######################
*/

const highlightTransparentColor = "#0be88160";
buttonAsideLeftList = document.getElementsByClassName("button-aside-left");

function handleButtonAsideLeftClick(event) {
	for (let i = 0; i < buttonAsideLeftList.length; i++) {
		buttonAsideLeftList[i].style.backgroundColor = "transparent";
		buttonAsideLeftList[i].style.borderWidth = "1px";
	}
	event.currentTarget.style.backgroundColor = highlightTransparentColor;
	event.currentTarget.style.borderWidth = "3px";

}

for (let i = 0; i < buttonAsideLeftList.length; i++) {
	buttonAsideLeftList[i].addEventListener("click", handleButtonAsideLeftClick);
	if (buttonAsideLeftList[i].id === "button-welcome") {
		buttonAsideLeftList[i].click();
	}
}

/* 
 * ######################
 * TITLE
 * ######################
*/

let isPage = true;
async function handleTitleClick() {
	if (isPage) {
		article_element.innerHTML = "<h1>!</h1>";
		isPage = false;
	}
	else {
		const html = await fetch_documizer();
		article_element.innerHTML = html;
		console.log(html)
		isPage = true;
	}
}

title_element = document.getElementById("p-title");
title_element.addEventListener("click", handleTitleClick);

/* 
 * ######################
 * FETCH DOCUMIZER
 * ######################
*/

async function fetch_documizer() {
	try {
		const response = await fetch("data/documizer.html");
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const fileContent = await response.text();
		return fileContent;
	} catch (error) {
		console.error("Error fetching documizer! Error: ", error);
		return "<p>NULL</p>";
	}
}
