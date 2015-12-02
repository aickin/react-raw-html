import React from "react";

import flattenChildren from "./flattenChildren";
import rawHtmlFactory from "./rawHtmlFactory";

const getChildrenAsString = (children) => {
	return flattenChildren(children).join("");
}

export default rawHtmlFactory(getChildrenAsString);
