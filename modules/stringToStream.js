import stream from "stream";

// turns a string into a Readable stream.
export default (input) => {
  const output = new stream.Readable();
  let pushed = false;
  output._read = function(n) {
    if (pushed) {
      this.push(null);
    } else {
      pushed = true;
      this.push(input);
    }
  }; 
  return output;
}

