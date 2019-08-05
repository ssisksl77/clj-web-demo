/*
정수 배열(int array)이 주어지면 두번째로 큰 값을 프린트하시오.
Given an integer array, find the second largest element.
예제)
Input: [10, 5, 4, 3, -1]
Output: 5
Input: [3, 3, 3]
Output: Does not exist.
*/

function solution(arr) {
  var first, second;
  if (arr.length < 2) { console.log("Does not exist."); return; }

  first = second = Number.MIN_SAFE_INTEGER;
  // console.log(first, second, arr);
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > first) {
      second = first;
      first = arr[i];
    } else if (arr[i] > second && arr[i] != first) {
      second = arr[i];
    }
  }

  if (second == Number.MIN_SAFE_INTEGER) {
    console.log("Does not exist.");
  } else {
    console.log(second);
  }
}

solution([10, 5, 4, 3, -1]);
solution([3,3,3]);
