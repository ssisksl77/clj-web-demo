/*
문자열 배열(string array)이 주어지면, 제일 긴 공통된 접두사(prefix)의 길이를 찾으시오.
Given an array of strings, find the longest common prefix of all strings.

예제)
Input: [“apple”, “apps”, “ape”]
Output: 2 // “ap”

Input: [“hawaii”, “happy”]
Output: 2 // “ha”

Input: [“dog”, “dogs”, “doge”]
Output: 3 // “dog”
*/
function A(arr) {
  var i;
  var minLen = Number.MAX_SAFE_INTEGER;
  for (i = 0; i < arr.length; i++) {
    if(minLen > arr[i].length) minLen = arr[i].length;
  }

  var j;
  var currentValue;
  var ret = [];

  loop1:
  for (i = 0; i < minLen; i++) {
    currentValue = arr[0][i];
    for (j = 0; j < arr.length; j++) {
      if (currentValue != arr[j][i]) {
        break loop1;
      }
    }
    ret.push(currentValue);
  }
  console.log(ret.join(""));
}

A(['apple','apps','ape']);
A(['hawaii', 'happy']);
A(['dog', 'dogs', 'doge']);
