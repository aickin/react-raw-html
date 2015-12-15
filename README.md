# react-raw-html

This is a simple library of React components that can embed raw HTML.

```javascript
import React from "react"
import RawHtml from "react-raw-html"

const MyComponent = (somePreformattedRawHtml) => {
	// returns a div that embeds somePreformattedRawHtml without escaping it for the browser.
	return <RawHtml.div>{somePreformattedRawHtml}</RawHtml.div>;
}

export default MyComponent;
```

This is just syntactic sugar around React's `dangerouslySetInnerHtml`.

Please note that embedding raw HTML that comes from untrusted sources can be extremely dangerous and lead to cross-site scripting attacks. You should only use these components if you are completely positive that the content you are embedding is safe.

## Installation

```
npm install react-raw-html
```

## API

### RawHtml.<tagname>

All of the current non-empty HTML 5 tag names should be present on the RawHtml object as components. So if you want to embed raw HTML in a span, use `RawHtml.span`. If you want a div, use `RawHtml.div`. You get the idea.

### RawHtml.addTag(String)

If you want to use a tag that is not part of the HTML5 tag list, this method allows you to add a new tag to `RawHtml`. Note that the tag should be lower-cased, so that React doesn't think it is a React component.

```javascript
import React from "react"
import RawHtml from "react-raw-html"

RawHtml.addTag("mycooltag");

const MyComponent = (somePreformattedRawHtml) => {
	return <RawHtml.mycooltag>{somePreformattedRawHtml}</RawHtml.mycooltag>;
}

export default MyComponent;
```