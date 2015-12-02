export default (input) => {
	return (
		typeof input.isPaused === "function" &&
		typeof input.pause === "function" &&
		typeof input.pipe === "function" &&
		typeof input.read === "function" &&
		typeof input.resume === "function" &&
		typeof input.setEncoding === "function" &&
		typeof input.unpipe === "function" &&
		typeof input.unshift === "function" &&
		typeof input.wrap === "function"
	);
}