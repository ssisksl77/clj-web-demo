(ns web-demo.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            ;; [ring.middleware.json :only [wrap-json-response]]
            [web-demo.db :as db]
            [web-demo.layer :as layer]))

(defroutes app-routes
  (GET "/" [] "Hello World")
  ;;(GET "/testing" [] "TESTING")
  (GET "/testing" [] (layer/layout-testing (db/select-testing-all)))
  (route/not-found "Not Found"))


(def app
  (wrap-defaults app-routes site-defaults))
;; lein ring server
;; lein ring uberjar
