(ns web-demo.layer
  (:require [hiccup.core :refer (html)]))

(defn layout-testing [content]
  (html
   [:head [:title "TESTING"]]
   [:body (for [i content]
            [:ul
             [:li {:class "testing data"} (:data i)]])]))

;(def ai '({:data "A"} {:data "B"}))
;(for [i ai] (html [:div {:class "testing data"} (:data i)]))

