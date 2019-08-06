/*
String이 주어지면, 중복된 char가 없는 가장 긴 서브스트링 (substring)의 길이를 찾으시오.
Given a string, find the longest substring that does not have duplicate characters.

예제)
Input: “aabcbcbc”
Output: 3 // “abc”

Input: “aaaaaaaa”
Output: 1 // “a”

Input: “abbbcedd”
﻿Output: 4 // “bced”
*/
function A(str) {
  var ret = 0;
  var start = 0;
  var m = {};
  for (var i = 0; i < str.length; i++) {
    if (m[str[i]]) {  // 동일한 녀석이 있으면, 긴 녀석으로 start 값을 바꾼다.
      start = Math.max(m[str[i]], start);
    }
    ret = Math.max(ret, i - start + 1);  // 현재 문자열 길이
    m[str[i]] = i + 1;  // 해당 char에 위치를 추가/갱신한다.
  }
  console.log(ret);
}

A("aabcbcbc");
A("aaaaaaaa");
A("abbbcedd");
