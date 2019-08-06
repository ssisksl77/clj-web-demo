/*
정수 배열(int array)과 정수 N이 주어지면, N번째로 큰 배열 원소를 찾으시오.
Given an integer array and integer N, find the Nth largest element in the array.

예제)
Input: [-1, 3, -1, 5, 4], 2
Output: 4

Input: [2, 4, -2, -3, 8], 1
Output: 8

Input: [-5, -3, 1], 3
﻿Output: -5
이 문제는 “Quick Select”의 알고리즘을 사용하는 대표적인 문제입니다.
Quick select는 퀵 정렬(quick sort)를 이용하는 알고리즘입니다.
퀵 정렬의 pivot을 정하고 1차 정렬을 하면 pivot의 원소 위치는 최종 정렬된 배열의 위치가 됩니다.
이것을 이용하여 모든 배열을 정렬 하지않고, pivot의 값을 비교하여, 찾는 값에 따라 pivot의 왼쪽이나 오른쪽만 정렬하는 알고리즘입니다.
*/

function swap(arr, x, y) {
  var tmp = arr[x];
  arr[x] = arr[y];
  arr[y] = tmp;
}

function partition(arr, first, last) {
  var pivot_spot = first;
  for (var i = first; i < last; i++) {
    if (arr[i] > arr[last]) {
      swap(arr, i, pivot_spot);
      pivot_spot++;
    }
  }
  swap(arr, pivot_spot, last);
  return pivot_spot;
}

function quickselect(arr, first, last, k) {
  if (first <= last) {
    var pivot = partition(arr, first, last); // 정렬하는 부분
    if (pivot == k) {
      return arr[k];
    } else if (pivot > k) {
      return quickselect(arr, first, pivot-1, k);
    } else {
      return quickselect(arr, pivot+1, last, k);
    }
  }
  return Number.MIN_SAFE_INTEGER;
}

function quickselectInit(arr, k) {
    return quickselect(arr, 0, arr.length - 1, k - 1);
}

console.log(quickselectInit([-1, 3, -1, 5, 4], 2));
console.log(quickselectInit([2, 4, -2, -3, 8], 1));
console.log(quickselectInit([-5, -3, 1], 3));
