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
		"a",
		"abbr",
		"acronym",
		"address",
		"applet",
		"article",
		"aside",
		"audio",
		"b",
		"basefont",
		"bdi",
		"bdo",
		"bgsound",
		"big",
		"blink",
		"blockquote",
		"body",
		"button",
		"canvas",
		"caption",
		"center",
		"cite",
		"code",
		"colgroup",
		"content",
		"data",
		"datalist",
		"dd",
		"del",
		"details",
		"dfn",
		"dialog",
		"dir",
		"div",
		"dl",
		"dt",
		"element",
		"em",
		"embed",
		"fieldset",
		"figcaption",
		"figure",
		"font",
		"footer",
		"form",
		"frame",
		"frameset",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hgroup",
		"html",
		"i",
		"iframe",
		"image",
		"ins",
		"isindex",
		"kbd",
		"label",
		"legend",
		"li",
		"listing",
		"main",
		"map",
		"mark",
		"marquee",
		"menu",
		"menuitem",
		"meter",
		"multicol",
		"nav",
		"nobr",
		"noembed",
		"noframes",
		"noscript",
		"object",
		"ol",
		"optgroup",
		"option",
		"output",
		"p",
		"picture",
		"plaintext",
		"pre",
		"progress",
		"q",
		"rp",
		"rt",
		"rtc",
		"ruby",
		"s",
		"samp",
		"script",
		"section",
		"select",
		"shadow",
		"small",
		"spacer",
		"span",
		"strike",
		"strong",
		"style",
		"sub",
		"summary",
		"sup",
		"table",
		"tbody",
		"td",
		"template",
		"textarea",
		"tfoot",
		"th",
		"thead",
		"time",
		"title",
		"tr",
		"tt",
		"u",
		"ul",
		"var",
		"video",
		"xmp",
	].forEach((tag) => RawHtml.addTag(tag));

	return RawHtml;
};