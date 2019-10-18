/*
정수(int)가 주어지면, 팰린드롬(palindrome)인지 알아내시오.
팰린드롬이란, 앞에서부터 읽으나 뒤에서부터 읽으나 같은 단어를 말합니다.
단, 정수를 문자열로 바꾸면 안됩니다.
Given an integer, check if it is a palindrome.

예제)
Input: 12345
Output: False

Input: -101
Output: False

Input: 11111
Output: True

Input: 12421
Output: True
*/
function solution(input) {
  if(input < 0 || (input % 10 == 0 && input != 0)) {
    return false;
  }
  let rHalf = 0;
  while(input > rHalf) {
    rHalf = rHalf * 10 + input % 10;
    input = Math.floor(input / 10);
  }
  // console.log(input == rHalf, !!(input == Math.floor(rHalf / 10)));
  return input == rHalf || !!(input == Math.floor(rHalf / 10));
}
console.log(solution(12345));
console.log(solution(11111));
console.log(solution(12421));
