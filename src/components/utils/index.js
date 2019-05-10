export const debounce = (f, ms) => {
  let timer = null;

  return function(...args) {
    const onComplete = () => {
      f.apply(this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
};
export const replaceAt = (string, index, replacement) => {
  return (
    string.substr(0, index) +
    replacement +
    string.substr(index + replacement.length)
  );
};
export const isInteger = num => (num ^ 0) === num;
export { Graph } from "./shortestPath";
