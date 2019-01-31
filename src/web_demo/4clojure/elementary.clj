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
; restrictions : flatten

(fn my-flatten [x]
  (if (coll? x)
    (mapcat my-flatten x)
    [x]))
;; learn deeper
;; https://mwfogleman.github.io/posts/20-12-2014-flatcat.html
(defn tree-seq
  [branch? children root]
  (let [walk (fn walk [node]
              (lazy-seq
                (cons node
                      (when (branch? node)
                        (mapcat walk (children node))))))]
    (walk root)))
(def result (tree-seq sequential? seq simplest-possible-case))
;; now we have all of the branches (including the input value), and all of the leaves.
;; we need just leaves, (all atoms.)
(filter atom? result)

;; mapcat
(concat [3 2 1 0] [6 5 4])
(apply concat [[3 2 1 0] [6 5 4]])
(mapcat [[3 2 1 0] [6 5 4]])

;; flatten source code
(defn flatten
  [x]
  (filter (complement sequential?) ;; 리프아닌것들 전부삭제
          (rest (tree-seq sequential? seq x))))  ;; rest: 첫번째 값은 전체 리스트임.

; http://www.4clojure.com/problem/29
#(reduce str (re-seq #"[A-Z]" %))
;http://www.4clojure.com/problem/solutions/29
#(->> %
  (re-seq #"[A-Z]")
  clojure.string/join);;이번에 푼거, res-seq는 모든 서브스트링을 리턴함.
;_artem_uv's solution:
#(apply str
  (filter (set (map char (range 65 91))) %))
;; *important!
;; set 자체가 함수가 될 수 있음 을 이용함
(range 65 91) ; (65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90)
(map char (range 65 91)) ; (\A \B \C \D \E \F \G \H \I \J \K \L \M \N \O \P \Q \R \S \T \U \V \W \X \Y \Z)
(set (map char (range 65 91))) ; #{\A \B \C \D \E \F \G \H \I \J \K \L \M \N \O \P \Q \R \S \T \U \V \W \X \Y \Z}
;; 이제 A-Z 자체가 필터링 되는 집합이 된거임.

;; 정규식 함수를 찾아보고 무엇을 사용하면 될지 확인하고 풀었다.
;; 하지만 고수는 아래처럼 셋을 이용해서 풀었다.

;http://www.4clojure.com/problem/30
;Compress a Sequence
#(reduce (fn [acc x] (if (= (last acc) x) acc (conj acc x))) [] %)
#(map first (partition-by identity %))
;http://www.4clojure.com/problem/solutions/30

;http://www.4clojure.com/problem/31
;Pack a Sequence
#(partition-by identity %)
;http://www.4clojure.com/problem/solutions/31
(fn [coll] (partition-by identity coll))
;; 기존 푼 방식
mapcat #(list % %)

;http://www.4clojure.com/problem/32
;Duplicate a Sequence
#(apply concat (map (fn [x] (list x x)) %))
; http://www.4clojure.com/problem/solutions/32
#(sort (into % %)) ; 뭐지 이 천재는?


;http://www.4clojure.com/problem/33
; 헐 내가 이런 괴랄한 코드를 짜다니.
(fn [col number]
  (for [x col _ (range number)]
  x))
;http://www.4clojure.com/problem/solutions/33
(fn f
  ([s t]
   (f s t '()))
  ([s t r]
   (if (empty? s)
     (reverse r)
     (recur (rest s) t (into r (repeat t (first s)))))))
