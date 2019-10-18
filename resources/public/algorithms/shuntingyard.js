let yard = (infix) => {
  let ops = {'+': 1, '-': 1, '*': 2, '/': 2};
  let peek = (a) => a[a.length - 1];
  let stack = [];

  return infix
    .split('')
    .reduce((output, token) => {
      if (parseFloat(token)) {
        output.push(token);
      }

      if (token in ops) {
        while (peek(stack) in ops && ops[token] <= ops[peek(stack)])
          output.push(stack.pop());
        stack.push(token);
      }

      if (token == '(') {
        stack.push(token);
      }

      if (token == ')') {
        while (peek(stack) != '(')
          output.push(stack.pop());
        stack.pop();
      }

      return output;
    }, [])
    .concat(stack.reverse())
    .join(' ');
};
yard('3 + 4 * 5 / (3 + 2)'); // 3 4 5 * 3 2 + / +
rpn(yard('3 + 4 * 5 / (3 + 2)')) // 7
