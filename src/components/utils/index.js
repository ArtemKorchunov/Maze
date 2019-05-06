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

export const splitByNewLine = str => str.split(/[\n\r|↵]/g);
export const isInteger = num => (num ^ 0) === num;
export { Graph } from "./shortestPath";
