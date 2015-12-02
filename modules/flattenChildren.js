import React from "react";

import isReadableStream from "./isReadableStream"

// flattens all children of a react element into a single array. usually,
// we could use React.Children.map here, but that function throws when it
// encounters a stream.
const flattenChildren = (children) => {
	if (!children) {
		return [];
	}
	if (typeof children === "string" || isReadableStream(children)) {
		return [children];
	}

	const result = [];
	children.forEach((child) => result.push(...flattenChildren(child)));
	return result;
}

export default flattenChildren;