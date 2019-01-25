(ns web-demo.db
  (:require [clojure.java.jdbc :as sql]))


(def db-spec {:dbtype "postgresql"
              :dbname "yhnam"
              :host (or (System/getenv "DATABASE_HOST")
                        "localhost")
              :port 5432
              :user "yhnam"
              :password 1234})

;; once
;; (sql/db-do-commands db-spec (sql/create-table-ddl :testing [[:data :text]]))
;; (sql/insert! db-spec :testing {:data "Hello World"})
;; (sql/query db-spec ["select * from testing"])
;; (sql/db-do-commands db-spec "drop table testing")
(defn log [m]
  (println m)
  m)

(defn select-testing-all []
  (println "hi this is db-spec")
  (println db-spec)
  (sql/query db-spec ["select * from testing"]))

(defn insert-testing [data]
  (sql/insert! db-spec :testing
               {:data data}))


