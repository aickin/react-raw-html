import multistream from "multistream";
import React from "react";

import flattenChildren from "./flattenChildren";
import isReadableStream from "./isReadableStream";
import rawHtmlFactory from "./rawHtmlFactory";
import stringToStream from "./stringToStream";

// returns the children as either a readable stream or, if possible, just a simple string.
const getChildrenAsStream = (children) => {
	const childrenArray = flattenChildren(children);

	if (childrenArray.every((child) => (typeof child === "string"))) {
		return childrenArray.join("");
	}

	return multistream(childrenArray.map((child) => {
		if (isReadableStream(child)) return child;

		if (typeof child === "string") return stringToStream(child);

		throw new Error("RawHtml can only have string or stream descendents when being run in node, but encountered " + child);
	}));
}

export default rawHtmlFactory(getChildrenAsStream);
