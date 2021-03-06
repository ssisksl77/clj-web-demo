/**
 * 2차 정수 배열(2D int array)가 주어지면, 소용돌이 모양으로 원소들을 프린트하시오. 예제를 보시오.
 * Given a 2D integer array, print all elements in a circular spiral shape starting from [0][0]. See example.
 * 예제)
 * input:
 * [[1, 2, 3],
 * [8, 9, 4],
 * [7, 6, 5]]
 * 
 * Output:
 * 1, 2, 3, 4, 5, 6, 7, 8, 9
 */
(function rec(arr) {
    for(let i = 0; i < arr.length; i++) {
        if (typeof arr[i] == "object") {
            rec(arr[i]);
        } else {
            console.log(arr[i]);
        }
    }
})([[1,2,3],[8,9,4],[7,6,5]]);

(function rec2(arr) {
    
})([[1,2,3],[8,9,4],[7,6,5]]);