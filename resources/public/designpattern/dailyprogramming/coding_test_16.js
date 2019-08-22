/*
두개의 정렬된(sorted) 정수 링크드리스트(linked list)가 주어지면, 두 리스트를 합친 정렬된 링크드리스트를 만드시오.
Given two sorted integer linked lists, merge the two linked lists. Merged linked list must also be sorted.

예제)
Input: 1->2->3, 1->2->3
Output: 1->1->2->2->3->3

Input: 1->3->5->6, 2->4
﻿Output: 1->2->3->4->5->6
*/
function merge(str1, str2) {
  var res = [];
  str1 = str1.split("->");
  str2 = str2.split("->");
  var len1 = str1.length;
  var len2 = str2.length;
  var i = 0, j = 0;
  while(i < len1 && j < len2) {
    if (!str1[i] || !str2[j]) break;

    if (str1[i] <= str2[j]) {
      res.push(str1[i++]);
    } else {
      res.push(str2[j++]);
    }
  }

  if (i < len1) {
    while (i < len1) {
      res.push(str1[i++]);
    }
  }

  if (j < len2) {
    while (j < len2) {
      res.push(str2[j++]);
    }
  }

  console.log(res.join('->'));
}

merge("1->2->3","1->2->3");
merge("1->3->5->6", "2->4");
