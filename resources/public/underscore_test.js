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
_.idendity = function(v) {
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
            for (var i = 0;, key = _.keys(data), len = keys.length; i < len; i++) {
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

_.filter([1,2,3,4], function() {
    return val > 2;
}));
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
        if (isArrayList(data)) {
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
