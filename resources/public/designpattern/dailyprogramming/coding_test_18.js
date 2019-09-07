/*
이진 트리를 루트 노드를 기준으로 좌우반전 하시오.
이 문제는 구글이 Homebrew 창시자에게 낸 문제로 유명합니다.

Given a binary tree root node, reverse the tree horizontally.
*/
var log = console.log;

function make_tree(v, l, r) {
    return [v,l,r];
}

function value(node) {
    return node[0];
}
function left(node) {
    return node[1];
}
function right(node) {
    return node[2];
}

function setValue(n, v) {
    n[0] = v;
}
function setLeft(n, ln) {
    n[1] = ln;
}
function setRight(n, rn) {
    n[2] = rn;
}

function display(root) {
    if (!root) { return null;}
    display(left(root));
    log(value(root));
    display(right(root));
}

/**
 * 
 * @param {*} root 
 * @description 
 *  노드 에서 left, right를 바꾼다.
 *  재귀적으로 작은 녀석들 부터 시작해서 큰 녀석들이 바뀌어야 함.
 */
function invert(root) {
    if (!root) { return null; }
    let l = invert(left(root));
    let r = invert(right(root));
    
    setLeft(root, r);
    setRight(root, l);
    return root;
}

//let root = make_tree(1, make_tree(2), make_tree(3));
let root = [1, [2, [3, null, null], [4, null, null]], [5, [6, null, null], [7, null, null]]];
display(root);
invert(root);
log();
display(root);