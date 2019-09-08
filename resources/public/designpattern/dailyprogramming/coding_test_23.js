/**
 * 정수 배열과 정수 k가 주어지면 모든 원소를 k칸씩 앞으로 옮기시오.
 * Given an array and an integer K, shift all elements in the array K times.\
 * 
 * input: [1, 2, 3, 4, 5], k = 2
 * output: [3, 4, 5, 1, 2]
 * 
 * input: [0, 1, 2, 3, 4], k = 1
 * output: [1, 2, 3, 4, 0]
 * 
 * 시간복잡도와 공간복잡도를 최대한 최적화 하시오.
 */
function solution(arr, n) {
    var newarr = arr.splice(2);
    console.log(newarr.concat(arr));
}