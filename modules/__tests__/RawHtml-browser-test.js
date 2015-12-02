// jest.dontMock("../RawHtml-browser");
import "./autoMockOff";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import RawHtml from "../RawHtml-browser"

describe("Raw HTML components", () => {
	it("renders an empty div", () => {
		const div = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<RawHtml.div></RawHtml.div>));
		expect(div.innerHTML).toBe("");
	});

	it("renders a string without special characters", () => {
		const div = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<RawHtml.div>Hello, world!</RawHtml.div>));
		expect(div.innerHTML).toBe("Hello, world!");
	});

	it("renders multiple strings without special characters", () => {
		const div = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<RawHtml.div>{"Hello, world!"}{"Goodbye, world!"}</RawHtml.div>));
		expect(div.innerHTML).toBe("Hello, world!Goodbye, world!");
	});

	it("renders a string with special characters", () => {
		const div = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<RawHtml.div>{"Hello, <span>world!</span>"}</RawHtml.div>));
		expect(div.innerHTML).toBe("Hello, <span>world!</span>");
	});

	it("renders multiple string with special characters", () => {
		const div = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<RawHtml.div>{"Hello, <span"}{">world!</span>"}</RawHtml.div>));
		expect(div.innerHTML).toBe("Hello, <span>world!</span>");
	});

	it("renders an array of strings with special characters", () => {
		const div = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<RawHtml.div>{["Hello, <span", ">world!</span>"]}</RawHtml.div>));
		expect(div.innerHTML).toBe("Hello, <span>world!</span>");
	});

	it("renders a nested array of strings with special characters", () => {
		const div = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<RawHtml.div>{[["Hello, <sp", "an"], [[">wor"]], "ld!</span>"]}</RawHtml.div>));
		expect(div.innerHTML).toBe("Hello, <span>world!</span>");
	});

	it("renders different kinds of tags", () => {
		const div = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<RawHtml.div>{"Hello, < world!"}</RawHtml.div>));
		expect(div.tagName).toBe("DIV");
		const span = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<RawHtml.span>{"Hello, < world!"}</RawHtml.span>));
		expect(span.tagName).toBe("SPAN");
		const p = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<RawHtml.p>{"Hello, < world!"}</RawHtml.p>));
		expect(p.tagName).toBe("P");
	});


	
});