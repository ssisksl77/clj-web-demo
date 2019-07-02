/*
0과 1로 만들어진 2D 정수 배열이 있습니다.
0은 장애물이고 1은 도로일때, 두 좌표가 주어지면, 첫번째 좌표에서 두번째 좌표까지 가장 가까운 거리를 구하시오.
두 좌표는 모두 도로에서 시작되고 좌, 우, 아래, 위로 움직이며 대각선으로는 움직일 수 없습니다.
만약 갈 수 없다면 -1을 리턴하시오.

Given a 2D array with 0s and 1s, 0 represents an obstacle and 1 represents a road.
Find the closest distance between two given points.
You must only move up down right left.
You cannot move through an obstacle.

Input:

{{1, 0, 0, 1, 1, 0},

{1, 0, 0, 1, 0, 0},

{1, 1, 1, 1, 0, 0},

{1, 0, 0, 0, 0, 1},

{1, 1, 1, 1, 1, 1}}

Start: (0, 0)

Finish: (0, 4)

시간 복잡도: O(ROW*COL)

공간 복잡도: O(ROW*COL)
*/

var makePair = function(a,b) {
  return [a,b];
}
var first = function(pair) {
  return pair[0];
}
var second = function(pair) {
  return pair[1];
}

var point = function(a,b) {
  return makePair(a,b);
}
var getX = function(p) {
  return first(p);
}
var getY = function(p) {
  return second(p);
}

var neighbors = [point(1,0), point(0,1), point(-1,0), point(0,-1)];

function solution(map, src, dest) {
  var visited = [];
  for (let i = 0; i < map.length; i++) {
    visited[i] = [];
    for (let j = 0; j < map[0].length; j++) {
      visited[i][j] = false;
    }
  }

  var q = []; // enqueu: push, dequeue: shift
  var start = makePair(src, 0);
  q.push(start);

  while(q.length) {
    let cur = q.shift();
    //console.log(cur);
    let pt = first(cur);
    if (getX(pt) == getX(dest) && getY(pt) == getY(dest)) {
      return second(cur);
    }

    for (let i = 0; i < neighbors.length; i++) {
      let x = getX(pt) + getX(neighbors[i]);
      let y = getY(pt) + getY(neighbors[i]);

      if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) {
        continue;
      }
      if (map[x][y] == 0 || visited[x][y] == true) {
        continue;
      }
      visited[x][y] = true;
      let neighbor = makePair(point(x,y), second(cur) + 1);
      q.push(neighbor);
    }

  }
  return -1;
}

var input = [[1, 0, 0, 1, 1, 0]
            ,[1, 0, 0, 1, 0, 0]
            ,[1, 1, 1, 1, 0, 0]
            ,[1, 0, 0, 0, 0, 1]
            ,[1, 1, 1, 1, 1, 1]]
var start = [0,0];
var finish = [0,4];

console.log(solution(input, start, finish));
