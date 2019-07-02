/*
피보나치 배열은 0과 1로 시작하며, 다음 피보나치 수는 바로 앞의 두 피보나치 수의 합이 된다.
정수 N이 주어지면, N보다 작은 모든 짝수 피보나치 수의 합을 구하여라.
Fibonacci sequence starts with 0 and 1 where each fibonacci number is a sum of two previous fibonacci numbers.
Given an integer N, find the sum of all even fibonacci numbers.

예제)

Input: N = 12

Output: 10 // 0, 1, 2, 3, 5, 8 중 짝수인 2 + 8 = 10.

*/
function evenFibSum(n) {
  let sum = 0
  , a = 1
  , b = 1;

  while(b <= n) {
    if (b % 2 == 0) {
      sum += b;
    }
    let c = a + b;
    a = b;
    b = c;
  }
  return sum;
}

console.log(evenFibSum(12));
