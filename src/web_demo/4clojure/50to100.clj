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
    v1
    v2)))
[5 6 1 3 2 7])
