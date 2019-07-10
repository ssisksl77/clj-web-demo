/**
간격(interval)로 이루어진 배열이 주어지면, 겹치는 간격 원소들을 합친 새로운 배열을 만드시오.
간격은 시작과 끝으로 이루어져 있으며 시작은 끝보다 작거나 같습니다.

Given a list of intervals, merge intersecting intervals.

예제)
Input: {{2,4}, {1,5}, {7,9}}
Output: {{1,5}, {7,9}}

Input: {{3,6}, {1,3}, {2,4}}
Output: {{1,6}}
**/


function solve2(intervals) {
  const makeInterval = function(left, right) {
    return [left, right];
  };
  const left = function(interval) {
    return interval[0];
  };
  const right = function(interval) {
    return interval[1];
  };

  intervals.sort(function(a,b) {
      return left(a) > left(b) ? 1 : left(a) < left(b) ? -1 : 0;
  });

  let res = [];
  res.push(intervals[0]);
  const getLast = function(arr) {
    return arr[arr.length-1];
  }

  for(let i = 1; i < intervals.length; i++) {
    let inter = intervals[i];
    if (right(getLast(res)) < left(inter)) {
      res.push(inter);
    } else {
      let prev = res.pop();
      let cur = makeInterval(left(prev), Math.max(right(prev), right(inter)));
      res.push(cur);
    }
  }
  return res;
}
var res = solve2([[2,4], [1,5], [7,9]]); // [[1,5], [7,9]]
var res2 = solve2([[3,6], [1,3], [2,4]]);
console.log(res);
console.log(res2);
