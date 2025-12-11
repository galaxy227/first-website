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

export { fetchFileContent };
