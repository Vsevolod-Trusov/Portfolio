
select * from orders join GOODSTOORDER G on ORDERS.ID = G.ORDERID join GOODS G2 on G.GOODSID = G2.ID;
select * from userlogin;
select * from USER_TABLES;
select user_tables.table_name, column_name, data_type
from user_tables join user_tab_columns on
    user_tables.table_name = user_tab_columns.table_name ;
--views info
select view_name, text from user_views;
--profile role info
select * from dba_profiles;
select * from dba_roles;
select * from dba_sys_privs where GRANTEE = 'STAFF_ROLE';
select username, profile from dba_users where user_id >= 108 ;
select * from dba_tab_privs where GRANTEE = 'STAFF_ROLE';
--procedures info
select * from user_procedures where object_name= 'ADMIN_PACKAGE';
select USER_ARGUMENTS.OBJECT_NAME, USER_ARGUMENTS.ARGUMENT_NAME, USER_ARGUMENTS.DATA_TYPE, USER_ARGUMENTS.IN_OUT from user_arguments join USER_PROCEDURES
                                             on user_procedures.PROCEDURE_NAME = user_arguments.object_name
                                              where user_procedures.object_name = 'ADMIN_PACKAGE';

delete from userlogin;
delete from userprofile;
delete from goods;
delete  from goodstoorder;
delete  from history;
delete  from roads;
delete  from shapes;
delete  from reviews;
delete  from orders;
commit;
rollback;
--select
select * from userlogin;
select * from userprofile;
select * from deliverypoints;
select * from userpoints;
select * from goods;
select *  from goodstoorder;
select *  from history;
select *  from links;
select *  from roads;
select *  from shapes;
select *  from reviews;
select *  from orders;

select * from user_sdo_geom_metadata;
select
index_name, status, DOMIDX_OPSTATUS
from all_indexes
where owner = 'ADMIN';

