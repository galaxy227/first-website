import * as PAGE_SELECTOR from "./pageSelector.js";
import * as TITLE from "./title.js";

/* 
 * ######################
 * INIT
 * ######################
*/

async function init() {
	TITLE.init();
	await PAGE_SELECTOR.init();
}

/* 
 * ######################
 * MAIN
 * ######################
*/

await init();
