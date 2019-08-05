/*
주어진 string 에 모든 단어를 거꾸로 하시오.
Reverse all the words in the given string.

예제)
Input: “abc 123 apple”
Output: “cba 321 elppa”
*/
function solution(str) {
  return str.split(' ').map((s) => { return s.split('').reverse().join('');}).join(' ');
}

var input = "abc 123 apple";
console.log(solution(input));
