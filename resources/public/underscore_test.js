var _ = {};
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
function getLength(list) {
    return list == null ? void 0 : list.length; // void 0 == undefined
}

var isArrayLike = function(list) {
    var len = getLength(list);
    return typeof len == 'number' && len >= 0 && len <= MAX_ARRAY_INDEX;
};

_.map = function(data, iteratee) {
    var new_list = [];
    if (isArrayLike(data)) {
        for (var i = 0, len = data.length; i < len; i++) {
            new_list.push(iteratee(data[i], i, data));
        }
    } else {  // for-in문을 통해 data가 가진 key들의 크기만큼 루프를 돈다.
        for (var key in data) {
            // hasOwnProperty를 통해 객체가 직접 가진 key인지를 체크한다.
            // prototype에 있는 값을 제외하기 위함이다.
            if (data.hasOwnProperty(key)) new_list.push(iteratee(data[key], key, data));
        }
    }
    return new_list;
};

_.map([1,2,3], function(v) {
    return v * 2;
});
_.map({a:3, b:2, c:1}, function(v) {
    return v * 2;
});

// this를 쓰지 않고 개발자에게 위임하자.
_.map([1,2,3], function(v) {
    return v * this;
}.bind(5));

// 3.2.3 쓸모없어보이는 함수
_.identity = function(v) {
    return v;
}
_.idtt = _.identity;
_.values = function(list) {
    return _.map(list, _.identity);
}
// console.log(_.values({id:5, name: "JE", age: 27}));
// [5, "JE", 27]

//벌써, _.map, _.identity, _.values 3개를 만들었다.
_.args0 = _.identity;
_.args1 = function(a, b) {
    return b;
}
_.keys = function(list) {
    return _.map(list, _.args1);
}
_.keys([3,2,1])
_.keys({id:5, name:"JE", age:27})


// 3.2.4 _.each
_.each = function(data, iteratee) {
    if (isArrayLike(data)) {
        for (var i = 0, len = data.length; i < len; i++) {
            iteratee(data[i], i, data);
        }
    } else {
        for (var key in data) {
            if (data.hasOwnProperty(key)) iteratee(data[key], key, data);
        }
    }
    return data;
}
// _.map보다 하는 일이 적다.
//_.each([1,2,3], console.log);

// 3.2.5 함수로 함수 만들기
// 함수적인 아이디어를 확인하기 위해 _.map, _.each를 하나로 줄여 보고자 한다.
// _.map, _.each를 if 등으로 구분하지 않고도 중복을 제거할 수 있을까?
function bloop(new_data, body) {
    return function(data, iteratee) {
        var result = new_data(data);  // 리턴값을 []로 할지 원래값으로 할지 new_data에 위임(추상화)
        if(isArrayLike(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                body(iteratee(data[i], i, data), result); // push를 할지 아무것도 안할지 body로 위임(추상화)
            }
        } else {
            for (var key in data) {
                if (data.hasOwnProperty(key))
                    body(iteratee(data[key], key, data), result);
            }
        }
        return result;
    }
}

_.map = bloop(function() {
    return [];
}, function(val, obj) {
    return obj.push(val);
})

_.each = bloop(function(v) {
    return v;
}, function() {});
// bloop이라는 뼈대 함수를 만든 후 new_data 함수와 body 함수로 해당 지점을 추상화했다.

// bloop(
//     function(v) {return v;},
//     function() {}
// )(
//     [5,6,7],
//     function(v) {console.log(v);}
// )

// code 3-41
_.array = function() {return []};
_.push_to = function(val, obj) {
    obj.push(val);
    return val;
};
_.noop = function() {};

_.map =  (_.array, _.push_to);
_.each = bloop(_.identity, _.noop);
//와... 천재에 가깝다.

// 3.2.6 Object.keys
// _keys와 Object.keys
// _.keys(null); // 지금은 작동안한다. 하지만 언더스코어에서는 작동함.
// Object.keys(null); // Uncaught TypeError:
// keys의 코드가 아주 복잡한데 그 중 어떨 때, Object.keys를 사용할지 확인한다.
// IE9 이상부터 Object.keys가 가능하다.
// code 3-44
_.keys = function(data) {
    return data ? Object.keys(data) : [];
}
// 이걸론 부족하다.
// code 3-45
_.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};
_.keys = function(obj) {
    return _.isObject(obj) ? Object.keys(obj) : [];
};

_.keys({name:"PJ"});
_.keys([1,2,3]);
_.keys(10);
_.keys(null); // 이제 작동함.


// 3.2.7 bloop 개선하기
// code 3-46
function bloop(new_data, body) {
    return function(data, iteratee) {
        var result = new_data(data);
        if (isArrayLike(data)) {
            for (var i = 0, len = data.length; i < length; i++) {
                body(iteratee(data[i], i, data), result);
            }
        } else {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    body(iteratee(data[key], key, data), result);
                }
            }
        }
        return result;
    }
}
// for in문을 통해 key의 개수만큼 돌면서 직접 가진 값인지를 체크하고 있다.
// hasOwnProperty를 하면 객체가 가진 모든 프로퍼티가 튀어나온다.
function bloop(new_data, body) {
    return function(data, iteratee) {
        var result = new_data(data);
        if (isArrayLike(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                body(iteratee(data[i], i, data), result);
            }
        } else {
            for (var i = 0, key = _.keys(data), len = keys.length; i < len; i++) {
                body(iteratee(data[keys[i]], keys[i], data), result);
            }
        }
        return result;
    }
}

_.map = bloop(_.array, _.push_to);
_.each = bloop(_.identity, _.noop);
_.map({a:3, b:2, c:1}, function(v) {
    return v * 2;
})
_.each({id: 5, name: "JE", age: 27}, console.log);


///////// 3.3 _.filter, _.reject, _.find, _.some, _.every 만들기
// 3.3.1 _filter
//code 3-49 _.old_filter
// array만 사용할 수 있다.
_.old_filter = function(data, predicate) {
    var result = [];
    for (var idx = 0, len = data.length; idx < len; idx++) {
        if (predicate(data[idx], idx, data)) result.push(data[idx]);
    }
    return result;
}

// for문을 .each로 변경
_.filter = function(data, predicate) {
    var result = [];
    _.each(data, function(val, idx, data) {
        if (predicate(val, idx, data)) result.push(val);
    });
    return result;
}

_.filter([1,2,3,4], function(val) {
    return val > 2;
});
// each로 바꾼 것 뿐인데 뭐가 달라진 것일까?
var obj = {a:1, b:2, c:3, d:4};
_.old_filter(obj, function(val) {
    return val > 2;
});
_.filter(obj, function(val) {
    return val > 2;
});


// 3.3.2 bloop으로 _.filter 만들기
function bloop(new_data, body) {
    return function(data, iteratee) {
        var result = new_data(data);
        if (isArrayLike(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                body(iteratee(data[i], i, data), result);
            }
        } else {
            for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
                body(iteratee(data[keys[i]], keys[i], data), result);
            }
        }
        return result;
    }
}

_.map = bloop(_.array, _.push_to);
_.each = bloop(_.identity, _.noop);

// _.filter를 만들기 전에 생각해보자.
/* 
먼저 bloop의 코드를 보며 구상을 해 보자. 

new_data : _.filter의 리턴값은 새로운 객체여야 한다. _.map을 만들 때처럼 _.filter에서도 new_data를 _.array로 사용하면 되겠다.  

body: body의 첫 번째 인자는 iteratee의 실행 결과이다. iteratee는 function(val) { return val > 2; }과 같은 함수가 될 것
이고 실행하면 true, false를 리턴한다. 현재 body로 들어가는 인자는 true,false값과 리턴될 새로운 배열 result이다.

_.filter에게는 result에 push할 해당 번째(인덱스)의 원본 값도 필요하다. 

**문제점 : 현재 body함수는 해당하는 값이 넘어오지 않고 있어 재료가 부족하다. (push할 해당 번째의 원본값이 없다.)
*/
// cod3 3-53 bloop을 고쳐서 _.filter 만들기
function bloop(new_data, body) {
    return function (data, iter_predi) {
        var result = new_data(data);
        if (isArrayLike(data)) {
            for (let i = 0, len = data.length; i < len; i++) {
                body(iter_predi(data[i], i, data), result, data[i]/* 새로운 bloop에 추가된 data[i] */);
            }
        } else {  // 배열이 아니니까 키값으로 꺼내는 것!
            for (let i = 0, keys = _.keys.length, len = keys.length; i < len; i++){
                body(iter_predi(data[keys[i]], keys[i], data), result, data[keys[i]]/* 새로운 bloop에 추가된 data[keys[i]]*/);
            }
        }
        return result;
    }
}

_.array = function() { return []; };

_.filter = bloop(_.array,
    function (bool, result, val) {
        if (bool) {
            result.push(val);
        }        
    });
var obj = {
    a: 1, 
    b: 2,
    c: 3,
    d: 4
};

_.filter(obj, function(val) {
    return val > 2;
}); //[3,4]

_.filter([1,2,3,4], function (val) {
    return val < 3;
}); //[1,2]
// 이렇게 바꾸면 map, each는 어떻게 되는거지? 그냥 쌩까고 안쓰면 되는 거였구나

// 3.3.3 _.rest, _.toArray, _.reverse, _.if
(function(bool, result, val) {
    if (bool) result.push(val);
});

// 3-55 _.toArray, _.rest, _.reverse
_.toArray = function(list) {
    return Array.isArray(list) ? list : _.values(list);
};
_.rest = function(list, num) {
    return _.toArray(list).slice(num || 1);
};
_.rest([1,2,3]); // [2, 3]
_.rest({0: 1, 1: 10, 2: 100, 3: 1000, length: 4}, 2); // [100. 1000]

// _.toArray, _.rest를 구현하는 가장 좋은 아이디어는 [코드 2-60]에서도 확인했다.
// 위 코드는 이 장의 목적(함수적 아이디어 생각해보기)를 위해 위와 같이 만들었다.
// 2-60 리뷰
var slice = Array.prototype.slice;
function toArray(data) {
    return slice.call(data);
}
function rest(data, n) {
    return slice.call(data, n || 1);
}

_.reverse = function(list) {
    return _.toArray(list).reverse();
}
_.reverse([1,2,3]);
_.reverse({});
_.reverse(null);
_.rest(_.reverse({0:1, 1: 10, 2: 100, 3: 1000, length: 4}));

// 3-56 _.rester : 함수를 리턴한다. 리턴된 함수가 실행되면, _.rest를 이용해 num만큼 앞
// 에서부터 받은 인자를 제거한 후, 받아두었던 func에게 전달한다.
_.rester = function(func, num) {
    return function() {
        return func.apply(null, _.rest(arguments, num));
    }
};
function sum(a,b,c,d) {
    return (a || 0) + (b || 0) + (c || 0) + (d || 0);
}

_.rester(sum)(1,2,3,4);
_.rester(sum, 2)(1,2,3,4)

// 3-57 if
_.if = function(validator, func, alter) {
    return function() {
        return validator.apply(null, arguments) ?
            func.apply(null, arguments) :
            alter && alter.apply(null, arguments);
    }
}

function sub(a,b) {
    return a - b;
}

var sub2 = _.if(
    function(a,b) { return a >= b; },
    sub,
    function() { return new Error("a가 b보다 작습니다.")}
);

sub2(10, 5);
sub(2, 5);

var diff = _.if(
    function(a,b) { return a >= b; },
    sub,
    function(a,b) { return sub(b,a)}
);
diff(2,5);
_.safety = _.with_validator = _.if;
// _.if: 인자를 validator에 넘기고 참이면 func, 거짓이면 alter를 실행하는 함수를 리턴하는 함수다.

// 3-58 : _.if를 이용하여 함수 만들기 
_.toArray = function(list) {
    return Array.isArray(list) ? list : _.values(list);
}
_.toArray2 = _.if(Array.isArray, _.idtt, _.values);

_.toArray2([1,2,3]); 
_.toArray2({0:1, 1:10, 2:100, 3:1000, length: 4});

_.constant = function(v) {
    return function() { return v; }
}

var square = _.safety(
    function(a) { return toString.call(a) == '[object Number]'},
    function(a) { return a*a;},
    function() { return 0; } // or _.constant(0);
);
square(5);

//3.3.4 익명함수 없이 _.filter만들기
// 3-59
// _.filter = bloop(_.array,
//     function (bool, result, val) {
//         if (bool) {
//             result.push(val);
//         }
//     });
// 위는 원래 필터모습

_.push = function(obj, val) {
    obj.push(val);
    return obj;
};
_.filter = bloop(_.array, _.if(_.idtt, _.rester(_.push)));
// idtt를 실행하게 해서, 인자로 들어온 함수가 그대로 실행되도록 함.
// 인자가 참이면, _.rester가 리턴해 준 함수를 실행할 것

_.filter([1,2,3,4], function(val) {
    return val > 2;
})
_.filter([1,2,3,4], function(val){
    return val < 3;
});

// filter가 어떻게 줄어들기 시작했는지 확인해보자.
// 1번째 시도.
_.filter = function(data, predicate) {
    var result = [];
    if (isArrayLike(data)) {
        for (var i = 0, len = data.lengh; i < len; i++) {
            if (predicate(data[i], i, data)) result.push(data[i]);
        }
    } else {
        for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
            if (predicate(data[keys[i]], keys[i], data)) result.push(keys[i]);
        }
    }
    return result;
};
// 2번째 시도.
_.filter = function(data, predicate) {
    var result = [];
    _.each(data, function(val, idx, data) {
        if (predicate(val, idx, data)) result.push(val);
    });
    return result;
};

// 3번째 시도.
_.filter = bloop(_.array, function(bool, result, val) {
    if (bool) result.push(val);
});

// 4
_.filter = bloop(_.array, _.if(_.idtt, _.rester(_.push)));



// 3.3.5 _.reject : filter의 반대.
// 3-63 _.reject
_.filter = bloop(_.array, _.if(_.idtt, _.rester(_.push)));

// 1.
_.reject = bloop(_.array, _.if(_.idtt, _.noop, _.rester(_.push)));
_.negate = function(func) {
    return function() {
        return !func.apply(null, arguments);
    }
};

// 2.
_.reject = bloop(_.array, _.if(_.negate(_.idtt), _.rester(_.push)));

// 3.
_.not = function(v) {return !v};
_.reject = bloop(_.array, _.if(_.not, _.rester(_.push)));

// final compare
_.filter = bloop(_.array, _.if(_.idtt, _.rester(_.push)));
_.reject = bloop(_.array, _.if(_.not, _.rester(_.push)));

//3.3.6 _.find, _.some, _.every를 만들기 위해 bloop 고치기
// 중간에 원하는 결과를 얻으면 루프를 빠져나와야 한다.
// code 3-65 bloop에 stopper 추가
function bloop(new_data, body, stopper) {
    return function(data, iter_predi) {
        var result = new_data(data);
        var memo;
        if (isArrayLike(data)) {
            for (let i = 0, len = data.length; i < len; i++) {
                memo = iter_predi(data[i], i, data); // 결과를 재료로 사용하기 위해 변수에 담기.
                if (!stopper) body(memo, result, data[i], i); // stopper가 없으면 원래 로직대로
                else if (stopper(memo)) return body(memo, result, data[i], i);
            }
        } else {
            for (let i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
                memo = iter_predi(data[keys[i]], keys[i], data);
                if (!stopper) body(memo, result, data[keys[i]], keys[i]);
                else if (stopper(memo)) return body(memo, result, data[keys[i]], keys[i]);
            }
        }
        return result;
    }
}
_.each = bloop(_.identity, _.noop);
_.map = bloop(_.array, _.push_to);
_.filter = bloop(_.array, _.if(_.idtt, _.rester(_.push)));
_.reject = bloop(_.array, _.if(_.not, _.rester(_.push)));
//_.each([1,2,3], function(v) { console.log(v); });
_.map([1,2,3], function(v) { return v * v});
_.filter([1,2,3,4], function(val) { return val > 2; });
// 3.3.7 _.find
_.noop = function() {};
_.idtt = function(v) { return v; };

_.find = bloop(
    _.noop,  // new_data - 하나도 못 찾은 경우 undefined를 리턴하기 위해
    function(bool, result, val) { return val; }, // body - stopper 조건에 부합할 경우 리턴할 값
    _.idtt); // stopper - 참일 때 나가기 위해 memo의 값(val)을 그대로 리턴
_.find([1, 10, 100, 1000], function(v) { return v > 50; });

var users = [
    {id: 2, name: "HA", age: 25},
    {id: 4, name: "PJ", age: 28},
    {id: 5, name: "JE", age: 27}
];
_.find(users, user => user.age == 27);
// code 3-57 use _.rester to make shorter
_.find = bloop(_.noop, function(bool, result, val) {return val; }, _.idtt); // without _.rester
_.find = bloop(_.noop, _.rester(_.idtt, 2), _.idtt);

// 3.3.8 _.findIndex, _.findKey
// _.find에서 조금만 바꾸면 구현이 가능하다. 
// 3-68
_.find = bloop(_.noop, _.rester(_.idtt, 2), _.idtt);
_.findIndex = bloop(_.constant(-1), _.rester(_.idtt, 3), _.idtt);
_.findKey = bloop(_.noop, _.rester(_.idtt, 3), _.idtt);

_.findIndex([1,10,100,1000], function(v) {return v > 50});
_.findIndex([1,10,100,1000], function(v) {return v > 1000;});

_.findKey({ id: 4, name: "PJ", age: 28}, function(val) {return typeof val == "string";});

//3.3.9 _.some, _.every 
_.some = bloop(_.constant(false), _.constant(true), _.idtt);
_.every = bloop(_.constant(true), _.constant(false), _.not);
_.some([false, null, 10, undefined], Number.isInteger);
_.every([false, null, true, undefined], _.not);
_.every([function() {}, {}, [], {}], _.isObject);

// Underscore.js 의 _.some, _.every는 predicate을 생략할 수 있다. (isObject)
// bloop을 수정하자.
// 3-70 updaet bloop
function bloop(new_data, body, stopper) {
    return function(data, iter_predi) {
        iter_predi = iter_predi || _.idtt; // 넘어오지 않으면 _.idtt로 대체
        var result = new_data(data);
        var memo;
        if (isArrayLike(data)) {
            for (let i = 0, len = data.length; i < len; i++) {
                memo = iter_predi(data[i], i, data);
                if (!stopper) body(memo, result, data[i], i);
                else if (stopper(memo)) return body(memo, result, data[i], i);
            }
        } else {
            for (let i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
                memo = iter_predi(data[keys[i]], data[keys[i]], keys[i]);
                if (!stopper) body(memo, result, data[keys[i]], keys[i]);
                else if (stopper(memo)) return body(memo, result, data[keys[i]], keys[i]);
                
            }
        }
        return result;
    }
}
_.some = bloop(_.constant(false), _.constant(true), _.idtt);
_.every = bloop(_.constant(true), _.constant(false), _.not);

_.some([false, null, 100, undefined]);
_.every([false, null, true, undefined]);
_.every([function() {}, {}, [], {}]);


// 3.3.10 함수형 프로그래밍에서 함수를 룆ㄱ이다.

// 3.4 _.reduce
// 3.4.4 reduce 만들기
// _.each를 이용한 구현
_.reduce = function(data, iteratee, memo) {
    _.each(data, function(val, idx, data) {
        memo = iteratee(memo, val, idx, data);
    })
    return memo;
}
// bloop 
// bloop이 이제 엄청 복잡해졌다.
// 실제 Underscore에서는 이렇게 개발되지는 않는가보다. 성능상 이슈 때문이다.
function bloop(new_data, body, stopper, is_reduce) {
    return function(data, iter_predi, opt1) { // reduce인 경우 세 번째 인자인 opt1으로 memo를 받음
        iter_predi = iter_predi || _.idtt;
        var result = new_data(data);
        var memo = is_reduce ? opt1 : undefined;

        if(isArrayLike(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                memo = is_reduce ? 
                        iter_predi(memo, data[i], i, data) :
                        iter_predi(data[i], i, data);
                if (!stopper) body(memo, result, data[i], i);
                else if (stopper(memo)) return body(memo, result, data[i], i);
            }
        } else {
            for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
                memo = is_reduce ?
                        iter_predi(memo, data[keys[i]], keys[i], data) :
                        iter_predi(data[keys[i]], keys[i], data);
                if (!stopper) body(memo, result, data[keys[i]], keys[i]);
                else if(stopper(memo)) return body(memo, result, data[keys[i]], keys[i]);

            }
        }
        return is_reduce ? memo : result;
    }
}

_.reduce = bloop(_.noop, _.noop, undefined, true);
_.reduce([1,2,3], function(memo, val) {
    return memo + val;
}, 0);
_.reduce(users, function(names, user) {
    if (user.age > 20) names.push(user.name);
    return names;
}, []);

//3.4.5 bloop반으로 줄이기 
// 3-77 
function bloop(new_data, body, stopper, is_reduce) {
    return function(data, iter_predi, opt1) {
        iter_predi = iter_predi || _.idtt;
        var result = new_data(data);
        var memo = is_reduce ? opt1 : undefined;  //리듀스인 경우 쓰는 초기값
        var keys = isArrayLike(data) ? null : _.keys(data);
        for (var i = 0, len = (keys || data).length; i < len; i++) {
            var key = keys ? keys[i] : i;
            memo = is_reduce ? 
                    iter_predi(memo, data[key], key, data) : // 리듀스인경우 인자를 하나 더 넣는다.
                    iter_predi(data[key], key, data);
            if (!stopper) body(memo, result, data[key], key);
            else if (stopper(memo)) return body(memo, result, data[key], key);
        }
        return is_reduce ? memo : result;
    }
}

_.reduce = bloop(_.noop, _.noop, undefined, true);
_.each = bloop(_.identity, _.noop);

_.reduce([1,2,3], function(memo, val) {
    return memo + val;
}, 0);
_.each({a:1, b:2}, console.log);
_.each(null, console.log);


// filter 중간에 나가기
// 3-75 limiter 추가.
function bloop(new_data, body, stopper, is_reduce) {
    return function (data, iter_predi, opt1) {
        iter_predi = iter_predi || _.idtt;
        var result = new_data(data);
        var memo = is_reduce ? opt1 : undefined;
        var limiter = is_reduce ? undefined : opt1;  // reduce가 아닐 때만 opt1을 쓴다고??? 같은 변수를 서로 다른 경우에 쓴다는 거군.
        var keys = isArrayLike(data) ? null : _.keys(data);
        for (var i = 0, len = (keys || data).length; i < len; i++) {
            var key = keys ? keys[i] : i;
            memo = is_reduce ?
                iter_predi(memo, data[key], key, data) :
                iter_predi(data[key], key, data);
            if(!stopper) body(memo, result, data[key], key);
            else if(stopper(memo)) return body(memo, result, data[key], key);
            if (limiter && limiter == result.length) break;
        }
        return is_reduce ? memo : result;
    }
}
_.filter = bloop(_.array, _.if(_.idtt, _.rester(_.push)));
_.filter([1,2,3,4,5,6,7,8], function() {return true;});
_.filter([1, 2, 3, 4, 5, 6, 7, 8], function () { return true; }, 4);


// 코드의 양과 성능.
// 3-80
function bloop(new_data, body, stopper, is_reduce) {
    return function(data, iter_predi, opt1) {
        iter_predi = iter_predi || _.idtt;
        var result = new_data(data);
        var memo = is_reduce ? opt1 : undefined;
        var limiter = is_reduce ? undefined : opt1;
        var keys = isArrayLike(data) ? null : _.keys(data);

        if (is_reduce) {
            for (var i = 0, len = (keys || data).length; i < len; i++) {
                var key = keys ? keys[i] : i;
                memo = iter_predi(memo, data[key], key, data);
            }
            return memo;
        }

        if (stopper) {  // find, some, every, findIndex, findKey
            for (var i = 0, len = (keys || data).length; i < len; i++) {
                var key = keys ? keys[i] : i;
                var memo = iter_predi(data[key], key, data);
                if (stopper(memo)) return body(memo, result, data[key], key);
            }
        } else if(limiter) {  // each, map, filter, reject로 limit이 있을때
            for (var i = 0, len = (key || data).length; i < len; i++) {
                var key = keys ? keys[i] : i;
                body(iter_predi(data[key], key, data), result, data[key]);
                if (limiter == result.length) break;
            }
        } else {  // each, map, filter, reject
            for (var i = 0, len = (keys || data).length; i < len; i++) {
                var key = keys ? keys[i] : i;
                body(iter_predi(data[key], key, data), result, data[key]);
            }       
        }
        return result;
    }
}





//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// summary
