/* 
 * ######################
 * EVENT
 * ######################
*/

function handleButtonTitleClick() {
	window.location.reload();
}

/* 
 * ######################
 * INIT
 * ######################
*/

function init() {
	// Title
	const buttonTitle = document.getElementById("button-title");
	buttonTitle.addEventListener("click", handleButtonTitleClick);
}

export { handleButtonTitleClick, init };
