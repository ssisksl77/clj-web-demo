/*
정수로된 배열이 주어지면, 각 원소가 자신을 뺀 나머지 원소들의 곱셈이 되게하라.
단, 나누기 사용 금지, O(n) 시간복잡도

Given an integer array, make each element a product of all element values without itself.

예제)
input: [1, 2, 3, 4, 5]
output: [120, 60, 40, 30, 24]
*/
function A(arr) {
  var mul = arr.reduce((a,b) => {return a * b;});
  var res = arr.map(a => { return mul / a; });
  console.log(res);
}

A([1,2,3,4,5]);
