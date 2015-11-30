import React from "react";

const getChildrenAsString = (children) => {
	if (!children) {
		return "";
	}
	if (typeof children === "string") {
		return children;
	}
	let returnValue = "";
	for (let child of children) {
		returnValue += getChildrenAsString(child);
	}
	return returnValue;
}

const rawFactory = (Component) => {
	return class RawComponent extends React.Component {
		render() {
			const children = this.props.children;
			return <Component dangerouslySetInnerHTML={{__html:getChildrenAsString(children)}}/>;
		}
	}
}

const RawHtml = {
	addTag: function(tagName) {
		this[tagName] = rawFactory(tagName);
	}
};

[
	"div", 
	"h1", 
	"h2", 
	"h3", 
	"h4", 
	"h5", 
	"h6", 
	"p", 
	"span"
].forEach((tag) => RawHtml.addTag(tag));

export default RawHtml;
