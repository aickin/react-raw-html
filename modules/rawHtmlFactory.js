import React from "react";


const rawFactory = (Component, childrenFn) => {
	return class RawComponent extends React.Component {
		render() {
			const children = this.props.children;
			return <Component dangerouslySetInnerHTML={{__html:childrenFn(children)}}/>;
		}
	}
}

export default (childrenFn) => {
	const RawHtml = {
		addTag: function(tagName) {
			if (!this[tagName]) {
				this[tagName] = rawFactory(tagName, childrenFn);
			}
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

	return RawHtml;
};
