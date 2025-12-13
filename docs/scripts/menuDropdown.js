let is_hamburger = true;
const menuDropdown = document.getElementById("div-dropdown");

async function handleButtonMenuDropdownClick(event) {
	const image = event.currentTarget.querySelector("img");
	if (image === null) {
		console.error("Failure to query image element for menu dropdown");
		return;
	}
	if (is_hamburger) {
		image.src = "data/close.svg";
		is_hamburger = false;
		menuDropdown.style.display = "flex";
		event.currentTarget.style.width = "2.5rem";
		event.currentTarget.style.height = "2.5rem";
	} 
	else {
		image.src = "data/hamburger.svg";
		is_hamburger = true;
		menuDropdown.style.display = "none";
		event.currentTarget.style.width = "3rem";
		event.currentTarget.style.height = "3rem";
	}
}

export { handleButtonMenuDropdownClick }
