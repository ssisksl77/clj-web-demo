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

;;  http://www.4clojure.com/problem/21 fail .
(fn [_list idx]
    (loop [l _list
           i 0]
      (if (= i idx)
        (first l)
        (recur (rest _list) (inc i) ))))
