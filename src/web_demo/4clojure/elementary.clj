(ns web-demo.4clojure.elementary)

; http://www.4clojure.com/problem/19
; (= (__ [1 2 3 4 5]) 5)
; (= (__ '(5 4 3)) 3)
; (= (__ ["b" "c" "d"]) "d")
(fn [list_]
    (loop [l list_]
      (if (= 1 (count l))
        (first l)
        (recur (rest l)))))

#(->> %
      reverse
      first)

;; solution
#(nth % (dec (count %)))
;; my transform
#(->> %
      count
      dec
      (nth %))


; http://www.4clojure.com/problem/20
; (= (__ (list 1 2 3 4 5)) 4)
; (= (__ ["a" "b" "c"]) "b")
; (= (__ [[1 2] [3 4]]) [1 2])
#(->> %
    count
    (+ -2)
    (nth %))

http://www.4clojure.com/problem/21
(fn [_list t]
  (loop [l _list i 0]
    (if (= i t)
      (first l)
      (recur (rest l) (inc i)))))
;; transform
#(get (vec %1) %2)
#(-> %1
  vec
  (get %2))
;; popular solution
#(loop [x %1 y %2]
   (if (zero? y)
     (first x)
     (recur (rest x) (dec y))))

; http://www.4clojure.com/problem/22
; (= (__ '(1 2 3 3 1)) 5)
; restrictions: count
#(reduce (fn [x acc] (+ x 1)) 0 %)
; _artem_uv's solution:
(fn f
  ([s]
   (f s 0))
  ([s r]
   (if (empty? s)
     r
     (recur (rest s) (inc r)))))


; http://www.4clojure.com/problem/23
; (= (__ [1 2 3 4 5]) [5 4 3 2 1])
; restrictions : reverse, rseq
#(loop [xs %
        cnt (count xs)
        res '()]
   (if (= (count res) cnt)
     res
     (recur (rest xs) cnt (cons (first xs) res))))

; http://www.4clojure.com/problem/24
; (= (__ [1 2 3]) 6)
#(reduce + %)

; http://www.4clojure.com/problem/25
; (= (__ #{1 2 3 4 5}) '(1 3 5))
#(filter odd? %)

; http://www.4clojure.com/problem/26
; fibonacci sequence
#(map first (take % (iterate (fn [[a b]] [b (+ a b)]) [1 1])))

(defn fib
  ([] (fib 1 1))
  ([a b] (lazy-seq (cons a (fib b (+ a b))))))
(take 5 (fib))
;; more explained
(defn iter [[x y]]
  (vector y (+ x y)))
(nth (iterate iter [0 1]) 100)
;; using reuce
(reduce
 (fn [[a b] _] [b (+ a b)])
 [0 1]
 (range 10)) ;; ignore range only for loop count

;; _artem_uv's solution:
(fn f
  ([x] (f (- x 2) '[1 1]))
  ([x s]
    (if (> 0 (dec x))
      s
      (recur (dec x) (conj s (+ (last s) (last (butlast s))))))))

; http://www.4clojure.com/problem/28
