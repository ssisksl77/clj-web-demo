/**
 * nlog(g) 정렬 구현하기
 */

function quicksort(arr) {
    const swap = (arr, i, j) => {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    };

    const _q = (arr, l, r) => {
        if (l > r) { return null; }
        let pivot = l;
        for(let i = l; i < r; i++) {
            // arr[i] < arr[r]이면
            // pivot을 한칸 옆으로 간다. 어떻게 보면 arr[r]이 pivot 기준점인 것이다.
            if(arr[i] < arr[r]) {
                swap(arr, i, pivot);
                pivot++;
            }
        }
        swap(arr, pivot, r);  // pivot을 기준점에 놓는다.
        _q(arr, l, pivot - 1);
        _q(arr, pivot+1, r);
    };
    _q(arr, 0, arr.length-1);
}

var arr = [3, 1, 5, 6];
quicksort(arr);
console.log(arr);