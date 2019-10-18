; http://www.4clojure.com/problem/53
; hard
(reduce
  (fn [acc e]
    (let [last-e (:last-e acc)
          max-len (:max-len acc)
          cur-len (:cur-len acc)
          cur-v (:cur-v acc)
          ]
      (cond
        (< last-e e)  (assoc acc :cur-len (inc cur-len) :last-e e :cur-v (conj cur-v e))
        (> last-e e)
          (if (> cur-len max-len)
            (assoc acc :max-len cur-len :cur-len 1 :last-e e :cur-v [e] :max-v cur-v)
            (assoc acc :cur-len 1 :last-e e :cur-v [e]))
        :else (assoc acc :last-e e :cur-len 1 :cur-v [e]))))
{:max-len 1 :max-v [7] :last-e 7 :cur-len 1 :cur-v [7]} [7 6 5 4])



;; 결국 이걸로 풀었다...
#_((fn [col]
  (let [fst (first col)
        col (rest col)
        res (reduce
              (fn [acc e]
                (let [last-e (:last-e acc)
                      max-len (:max-len acc)
                      cur-len (:cur-len acc)
                      cur-v (:cur-v acc)
                      ]
                  (cond
                    (< last-e e)  (assoc acc :cur-len (inc cur-len) :last-e e :cur-v (conj cur-v e))
                    (> last-e e)
                      (if (> cur-len max-len)
                        (assoc acc :max-len cur-len :cur-len 1 :last-e e :cur-v [e] :max-v cur-v)
                        (assoc acc :cur-len 1 :last-e e :cur-v [e]))
                    :else (assoc acc :last-e e :cur-len 1 :cur-v [e]))))

                {:max-len 1 :max-v [fst] :last-e fst :cur-len 1 :cur-v [fst]} col)
          v1 (:max-v res)
          v2 (:cur-v res)
          ]
  (if (>= (count v1) (count v2))
    (if (= 1 (count v1))
      []
      v1)
    v2)))
[5 6 1 3 2 7])

;; http://www.4clojure.com/problem/solutions/53
;; https://stackoverflow.com/questions/23586710/what-is-fn-and-how-does-it-differ-from-fn
;; 머지... 이거...
(fn*
 [p1__2876#]
 (sort
  (set
   (flatten
    (map
     (fn [[a1 a2 a3]] (vector a2 a3))
     (apply
      max-key
      count
      (conj (reverse
      (filter
       ffirst
      (partition-by
       first
       (map
        (fn [[a1 a2]] (if (< a1 a2) (vector true a1 a2) (vector false a1 a2)))
        (partition
         2
         (interleave
          p1__2876#
          (conj (vec (rest p1__2876#)) (last p1__2876#)))))))) '())))))))

;; https://github.com/jethrokuan/4clojure-solutions/blob/master/53.clj
;; 맞아 이렇게 partition-by를 써야 했는데.
(fn [coll]
  (let [a (partition-by #(apply < %) (partition 2 1 coll))
        b (filter (fn [[[x1 x2]]] (< x1 x2)) a)
        c (first (sort-by count > b))]
    (concat (first c) (map last (rest c)))))

(def x  [1 0 2 3 4 5 1 2 4])
;; 모든 값을 둘로 쪼갰다. 대신 한칸씩 전진해서 2씩 나눈 것
;; 모두 이전 값을 가질 수 있게 되었다.
(def y (partition-by #(apply < %) (partition 2 1 x)))  ;; (((1 0)) ((0 2) (2 3) (3 4) (4 5)) ((5 1)) ((1 2) (2 4)))
;;이전 값보다 큰 것들만 가져온다.
(def z (filter (fn [[[x1 x2]]] (< x1 x2)) y))  ;; (((0 2) (2 3) (3 4) (4 5)) ((1 2) (2 4)))
;; 거기서 살아남은 것들중에 긴 순서대로 정렬한다.
;; 정렬 후 첫번째 녀석을 뽑는다.
(def a (first (sort-by count > z))) ;; ((0 2) (2 3) (3 4) (4 5))
;; 그 값의 첫번째값과 나머지값을 추출해서 빼낸다.
(concat (first a) (map last (rest a)))  ;; (0 2 3 4 5)  <- (concat '(0 2) '(3 4 5))

;; http://www.4clojure.com/problem/54
;; Partition a Sequence
(fn [n coll]
  (loop [c coll res []]
    (if (or (empty? c) (< (count c) n))
    res
    (recur (drop n c) (conj res (take n c))))))
;; lazy-seq써보려 했는데 안됨...
;;http://www.4clojure.com/problem/solutions/54
(fn f
  ([c s] (f c s '()))
  ([c s r] (if (empty? s) (reverse r)
             (recur c (drop c s) (if (= (count (take c s)) c) (conj r (take c s)) r)))))


;; http://www.4clojure.com/problem/55
(defn solve-55 [coll]
  (reduce (fn [acc i] (assoc acc i (inc (get acc i 0)))) {} coll))
(solve-55 [1 1 2 3 2 1 1])
;; http://www.4clojure.com/problem/solutions/55
;; solution 이해가 안되는데?
#(let [x (group-by identity (sort %))]
  (apply hash-map
    (interleave (keys x) (map count (vals x)))))

;; http://www.4clojure.com/problem/56#prob-title
;; Find Distinct Items
;; Topic: seqs core-functions
;; 리듀스로 풀어버림.
#(:res (reduce
    (fn [acc i] (if ((:hash acc) i)
                    acc
                    (do
                        (assoc acc :res (concat (:res acc) [i])
                                   :hash (assoc (:hash acc) i true))
                    ))) {:res [], :hash {}} %))
;; solution (재귀로 작업한 듯 하다.)
(fn f
   ([s] (f s []))
   ([s r]
    (if (empty? s)
      r
      (if (contains? (apply hash-map (interleave  r (repeat (count r) 0))) (first s))
        (recur (rest s) r)
        (recur (rest s) (into r ((comp vector first) s)))))))
