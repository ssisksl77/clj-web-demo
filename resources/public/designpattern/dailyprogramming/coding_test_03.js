/*
정수 n이 주어지면, n개의 여는 괄호 "("와 n개의 닫는 괄호 ")"로 만들 수 있는 괄호 조합을 모두 구하시오. (시간 복잡도 제한 없습니다).
Given an integer N, find the number of possible balanced parentheses with N opening and closing brackets.
예제)
Input: 1
Output: ["()"]

Input: 2
Output: ["(())", "()()"]

Input: 3
Output: ["((()))", "(()())", "()(())", "(())()", "()()()"]
*/

// 숫자만 만들어보기
function cnt(n) {
  let open = n
  , close = n;

  return dfs(open, close);
}
function dfs(open, close) {
  if (open < 0 || close < 0) {
    return 0;
  }
  if (open == 0 && close == 0) {
    return 1;
  }
  let ret = 0;
  ret += dfs(open-1, close);
  if (open < close) {
    ret += dfs(open, close-1);
  }
  return ret;
}
// console.log(cnt(3));

function solution(n) {
  let open = n,
  close = n;
  return _dfs(open, close, "");
}

// 문제 답에서는 매개변수에 결과값 참조를 하나 만들어서 거기에 직접 답을 추가.
function _dfs(open, close, brackets) {
  //console.log(brackets);
  if (open < 0 || close < 0) {
    return undefined;
  }
  if (open == 0 && close == 0) {
    return brackets;
  }
  let ret = [];
  let _tmp = _dfs(open-1, close, brackets + "(");
  if(_tmp) {
    ret = ret.concat(_tmp);
  }
  if (open < close) {
    _tmp = _dfs(open, close-1, brackets + ")");
    if(_tmp) {
      ret = ret.concat(_tmp);
    }
  }
  return ret;
}
console.log(solution(3));
