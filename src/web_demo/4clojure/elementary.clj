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

;http://www.4clojure.com/problem/34
;Special Restrictions : range
#(loop [x %1 y %2 res []]
  (if (= x y)
    (seq res)
    (recur (inc x) y (conj res x))))
;; http://www.4clojure.com/problem/solutions/34 개천재네
#(take (- %2 %1) (iterate inc %1))

;; http://www.4clojure.com/problem/38
;; 이번에 푼거. 좀씩 괜찮아 지는 듯?
(fn [& args] (reduce (fn [acc x] (if (> x acc) x acc)) args))
;; javascript로 풀어봄
(function foo(x, y, res = []) {
  if (x == y) {
    return res;
  }
  res.push(x);
  return foo(x+1, y, res);
}(-2, 2));

;;http://www.4clojure.com/problem/solutions/38
(fn [& x] (reduce (fn [y z] (if (< y z) z y)) 0 (seq x)))

;; http://www.4clojure.com/problem/39
;; Interleave Two Seqs
;; Special Restrictions : interleave
;; 아래처럼 풀어서 되었는데 실패한다고 한다. 이렇게 푸는건 아닌가보다.
(def fnc #(vec (flatten (seq (zipmap %1 %2)))))
(= (fnc [1 2 3] [:a :b :c]) '(1 :a 2 :b 3 :c))
(= (fnc [1 2] [3 4 5 6]) '(1 3 2 4))
(= (fnc [1 2 3 4] [5]) [1 5])
(= (fnc [30 20] [25 15]) [30 25 20 15])

;; mapcat source code
(defn my-mapcat
  ([f] (comp (map f) cat)) ;; collection 이 없다면 reducer를 이용한다.
  ([f & colls]  ;; 우린 이녀석만 본다.
   (apply concat (apply map f colls))))
;; 여러 매개변수를 하나의 리스트에 넣는다.(colls)
;; 이 리스트 안으로 들어가 map f를 실행해야 한다. (map f [coll_1 coll_2 ...])
;; 이렇게 하기 위해 apply를 넣는다.
(apply map #(list %1 %2) [[1 2 3] [:a :b :c]])
(macroexpand '(apply map #(list %1 %2) [[1 2 3] [:a :b :c]]))
;; ([1 :a 2 :b 3 :c])
;; 그리고 그 값들을 한대 합친다. (concat [...] [...] [...])
;; concat을 이 리스트 안에 넣어야 한다. apply를 사용한다.
(apply concat (apply map #(list %1 %2) [[1 2 3] [:a :b :c]]))
;; 결국 마지막에 푼 것
(fn [& cols] (apply concat (apply map #(list %1 %2) cols)))

;; 결국 mapcat만으로 풀 수 있는 것이었다.
((fn [x y]
  (mapcat #(list %1 %2) x y)) [1 2 3] [:a :b :c])
(fn [a b]
  (mapcat #(conj [] %1 %2) a b))
;; 결론 mapcat은 list안에 들어있는 모든 리스트들을 받아서 하나하나 동시에 map함수를 실행한다.
;; 리스트가 두개가 있으면 동시에 두개 리스트에서 각각 값을 가져와서 맵으로 실행될 함수에 넣어지는 것은
;; map의 기본기능이다. mapcat은 이런 map 기능 이후에 concat기능이 가미된 것뿐이다.
