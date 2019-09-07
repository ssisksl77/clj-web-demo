function idMaker(start) {
    return function() {
        return ++start;
    }
}

var messageCid = idMaker(0);
messageCid(); // 1
messageCid(); // 2

var postCid = idMaker(11);
postCide(); // 12
postCide(); // 13
messageCide(); // 3
postCide(); // 14

