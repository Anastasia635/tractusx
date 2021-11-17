#!/bin/bash
PG_HOST=localhost
caxdb() {
    DBNAME=$1
    shift
    psql "host=$PG_HOST port=5432 user=psqladmin password=$PG_PASS dbname=$DBNAME" $@
}

caxdb membercompany -f drop-tables.sql
caxdb membercompany -f create-tables.sql
caxdb membercompany -f insert-business-partners.sql
caxdb membercompany -f insert-member-companies.sql
caxdb membercompany -f insert-member-company-roles.sql
