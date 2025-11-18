/*
// Store a reference to the <h1> in a variable
const myHeading = document.querySelector("h1");
// Update the text content of the <h1>
myHeading.textContent = "Hello world!";

const myImage = document.querySelector("img");
myImage.addEventListener("click", () => {
	const mySrc = myImage.getAttribute("src");
	if (mySrc === "data/g2.png") {
		myImage.setAttribute("src", "data/firefox.png");
	} else {
		myImage.setAttribute("src", "data/g2.png");
	}
});

let myButton = document.querySelector("button");
let myHeader = document.querySelector("h1");
let introduction = "Welcome to GLEEG, ";
let savedName = "savedName";

function setUserName() {
	const newName = prompt("Please enter your name:");
	localStorage.setItem(savedName, newName);
	myHeader.textContent = introduction + newName;
}

if (!localStorage.getItem(savedName)) {
	setUserName();
} else {
	const name = localStorage.getItem(savedName);
	myHeader.textContent = introduction + name;
}

myButton.addEventListener("click", () => {
	setUserName();
});
*/
