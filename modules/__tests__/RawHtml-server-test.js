import "./autoMockOff";

import concatstream from "concat-stream";
import React from "react";
import ReactDOMStream from "react-dom-stream/server";
import stream from "stream";
import TestUtils from "react-addons-test-utils";

import RawHtml from "../RawHtml-server";
import stringToStream from "../stringToStream";

const render = (element, callback) => {
	ReactDOMStream.renderToStaticMarkup(element).pipe(concatstream({encoding: "string"}, (result) => {
		process.nextTick(() => callback(result));
	}));
}

describe("Server raw HTML components", () => {
	it("renders an empty div", (done) => {
		render(<RawHtml.div></RawHtml.div>, (result) => {
			expect(result).toBe("<div></div>");
			done();
		});
	});

	it("renders a string without special characters", (done) => {
		render(<RawHtml.div>Hello, world!</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, world!</div>");
			done();
		});
	});

	it("renders a stream without special characters", (done) => {
		render(<RawHtml.div>{stringToStream("Hello, world!")}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, world!</div>");
			done();
		});
	});

	it("renders multiple strings without special characters", (done) => {
		render(<RawHtml.div>{"Hello, world!"}{"Goodbye, world!"}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, world!Goodbye, world!</div>");
			done();
		});
	});

	it("renders multiple streams without special characters", (done) => {
		render(<RawHtml.div>{stringToStream("Hello, world!")}{stringToStream("Goodbye, world!")}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, world!Goodbye, world!</div>");
			done();
		});
	});

	it("renders a string with html tags", (done) => {
		render(<RawHtml.div>{"Hello, <span>world!</span>"}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, <span>world!</span></div>");
			done();
		});
	});

	it("renders a stream with html tags", (done) => {
		render(<RawHtml.div>{stringToStream("Hello, <span>world!</span>")}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, <span>world!</span></div>");
			done();
		});
	});

	it("renders a string with special characters", (done) => {
		render(<RawHtml.div>{"Hello, < world!"}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, < world!</div>");
			done();
		});
	});

	it("renders a stream with special characters", (done) => {
		render(<RawHtml.div>{stringToStream("Hello, < world!")}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, < world!</div>");
			done();
		});
	});

	it("renders multiple string with special characters", (done) => {
		render(<RawHtml.div>{"Hello, <span"}{">world!</span>"}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, <span>world!</span></div>");
			done();
		});
	});

	it("renders multiple streams with special characters", (done) => {
		render(<RawHtml.div>{stringToStream("Hello, <span")}{stringToStream(">world!</span>")}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, <span>world!</span></div>");
			done();
		});
	});

	it("renders an array of strings with special characters", (done) => {
		render(<RawHtml.div>{["Hello, <span", ">world!</span>"]}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, <span>world!</span></div>");
			done();
		});
	});

	it("renders an array of streams with special characters", (done) => {
		render(<RawHtml.div>{[stringToStream("Hello, <span"), stringToStream(">world!</span>")]}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, <span>world!</span></div>");
			done();
		});
	});

	it("renders a nested array of strings with special characters", (done) => {
		render(<RawHtml.div>{[["Hello, <sp", "an"], [[">wor"]], "ld!</span>"]}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, <span>world!</span></div>");
			done();
		});
	});

	it("renders a nested array of streams with special characters", (done) => {
		render(<RawHtml.div>{[
			[
				stringToStream("Hello, <sp"),
				stringToStream("an")
			],
			[
				[stringToStream(">wor")]
			],
			stringToStream("ld!</span>")
		]}</RawHtml.div>, (result) => {
			expect(result).toBe("<div>Hello, <span>world!</span></div>");
			done();
		});
	});

});