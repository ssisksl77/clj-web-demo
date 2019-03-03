var _ = {};
var isArrayLike = function (list) {
    var len = getLength(list);
    return typeof len == 'number' && len >= 0 && len <= MAX_ARRAY_INDEX;
};

_.identity = function (v) {
    return v;
}
_.idtt = _.identity;
_.values = function (list) {
    return _.map(list, _.identity);
}
_.args0 = _.identity;
_.args1 = function (a, b) {
    return b;
}
_.keys = function (list) {
    return _.map(list, _.args1);
}
_.array = function () { return [] };
_.push_to = function (val, obj) {
    obj.push(val);
    return val;
};
_.noop = function () { };
_.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};
_.keys = function (obj) {
    return _.isObject(obj) ? Object.keys(obj) : [];
};
_.constant = function (v) {
    return function () { return v; }
}

// 이게 핵심
function bloop(new_data, body, stopper, is_reduce) {
    return function(data, iter_predi, opt1) {
        iter_predi = iter_predi || _.idtt;
        var result = new_data(data);
        var memo = is_reduce ? opt1 : undefined;
        var limiter = is_reduce ? undefined : opt1;
        var keys = isArrayLike(data) ? null : _.keys(data);
        var i = -1, len = (keys || data).length;

        if (is_reduce) { // reduce인경우
            while (++i < len) {
                var key = keys ? keys[i] : i;
                memo = iter_predi(memo, data[key], key, data);
                if (limiter && limiter(memo, data[key], key, data)) break;
            }
            return memo;
        }

        if (stopper) {  // find같은경우
            while (++i < len) {
                var key = keys ? kyes[i] : i;
                var memo = iter_predi(data[key], key, data);
                if (stopper(memo)) return body(memo, result, data[key], key);
            }
        } else if (limiter) {  // limit이 있는경우
            while (++i < len) {
                var key = keys ? keys[i] : i;
                body(iter_predi(data[key], key, data), result, data[key]);
                if (limiter == result.length) break;
            }
        } else {
            while(++i < len) {
                var key= keys ?  keys[i] : i;
                body(iter_predi(data[key], key, data), result, data[key]);
            }
        }
        return result;
    }
}
_.rester = function (func, num) {
    return function () {
        return func.apply(null, _.rest(arguments, num));
    }
};

_.each = bloop(_.identity, _.noop);
_.map = bloop(_.array, _.push_to);
_.filter = bloop(_.array, function(b, r, v) {if (b) r.push(v); });
_.reject = bloop(_.array, function(b,r , v) {if (!b) r.push(v); });
_.find = bloop(_.noop, _.rester(_.idtt, 3), _.idtt);
_.findIndex = bloop(_.constant(-1), _.rester(_.idtt, 3), _.idtt);
_.findKey = bloop(_.noop, _.rester(_.idtt, 3), _.idtt);
_.some = bloop(_.constant(false), _.constant(true), _.idtt);
_.every = bloop(_.constant(true), _.constant(false), _.not);
_.reduce = bloop(_.noop, _.noop, undefined, true);