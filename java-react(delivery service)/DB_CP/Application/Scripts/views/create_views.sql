select *
from user_views;
create or replace view unprocessed_orders_view
as
select o1.ordername                                       as order_name,
       o1.orderdate                                       as order_date,
       o1.deliverydate                                    as delivery_date,
       o1.status                                          as order_status,
       o1.price                                           as order_price,
       o1.DELIVERYTYPE                                    as delivery_type,
       g.name                                             as good_name,
       userlogin.login                                    as executor_login,

       admin_package.get_customerlogin_by_order_id(o1.id) as customer_login,

       points.point_name                                  as delivery_point,
       admin_package.get_userlocation_by_order_id(o1.id)  as user_point

from orders o1
         join points on o1.deliverylocationid = points.id
         join goodstoorder gto on o1.id = gto.orderid
         join goods g on gto.goodsid = g.id
         join USERPROFILE on o1.excecutorprofileid = userprofile.id
         join userlogin
              on userprofile.userloginid = userlogin.id
where o1.status = 'unprocessed';

--all_points_names_view
create or replace view all_points_names_view
as
select point_name, type
from points;

--processed_orders
create or replace view processed_orders_view
as
select o1.ordername                                       as order_name,
       o1.orderdate                                       as order_date,
       o1.deliverydate                                    as delivery_date,
       o1.price                                           as order_price,
       o1.DELIVERYTYPE                                    as delivery_type,
       o1.status                                          as order_status,
       g.name                                             as good_name,
       userlogin.login                                    as executor_login,
       points.point_name                                  as delivery_point,
       admin_package.get_customerlogin_by_order_id(o1.id) as customer_login,
       admin_package.get_userlocation_by_order_id(o1.id)  as user_point
from orders o1
         join points on o1.deliverylocationid = points.id
         join goodstoorder gto on o1.id = gto.orderid
         join goods g on gto.goodsid = g.id
         join USERPROFILE on o1.excecutorprofileid = userprofile.id
         join userlogin
              on userprofile.userloginid = userlogin.id
where o1.status = 'processed';

--orders_not_executed_view
create or replace view orders_not_executed_view
as
select o1.ordername                                       as order_name,
       o1.orderdate                                       as order_date,
       o1.deliverydate                                    as delivery_date,
       o1.status                                          as order_status,
       o1.price                                           as order_price,
       o1.DELIVERYTYPE                                    as delivery_type,
       goods.name                                         as good_name,
       userlogin.login                                    as customer_login,
       user_package.get_executor_login_by_order_id(o1.id) as executor_login,
       points.point_name                                  as delivery_point,
       admin_package.get_userlocation_by_order_id(o1.id)  as user_point
from orders o1
         join points on o1.deliverylocationid = points.id
         join goodstoorder on o1.id = goodstoorder.orderid
         join goods on goodstoorder.goodsid = goods.id
         join userprofile on o1.CUSTOMERPROFILEID = userprofile.id
         join userlogin on userprofile.userloginid = userlogin.ID
where o1.status != 'executed';

--reviews_view
create or replace view reviews_view as
select content, estimation, userlogin.login as login
from reviews
         join userprofile
              on reviews.userprofileid = userprofile.id
         join USERLOGIN
              on userprofile.userloginid = userlogin.id;


--history_view
create or replace view HISTORY_VIEW as
select g.name         as name,
       o.ordername       as order_name,
       o.status       as status,
       o.orderdate    as order_date,
       o.deliverydate as delivery_date,
       ul.login       as user_login
from orders o
         join history h on h.orderid = o.id
         join userprofile u on o.customerprofileid = u.id
         join userlogin ul on u.userloginid = ul.id
         join goodstoorder gto on o.id = gto.orderid
         join goods g on gto.goodsid = g.id;

--deleted
--analysis_route_view
drop view analysis_route_view;
create or replace view analysis_route_view
as
select p2.point_name as delivery_point,
       count(*)      as staff_count
from userprofile
         join points p1
              on userprofile.USERPOINTID = p1.id
         join userlogin on
    userprofile.USERLOGINID = userlogin.id
         join points p2 on p2.id = userprofile.USERPOINTID
where p2.type = 'staff'
  and userlogin.role = 'staff'
  and userlogin.login != 'executor'
group by p2.point_name;

--orders_not_executed_view
create or replace view orders_executed_view
as
select o1.ordername                                       as order_name,
       o1.orderdate                                       as order_date,
       o1.deliverydate                                    as delivery_date,
       o1.status                                          as order_status,
       o1.price                                           as order_price,
       o1.DELIVERYTYPE                                    as delivery_type,
       goods.name                                         as good_name,
       userlogin.login                                    as customer_login,
       user_package.get_executor_login_by_order_id(o1.id) as executor_login,
       points.point_name                                  as delivery_point,

       admin_package.get_userlocation_by_order_id(o1.id)  as user_point
from orders o1
         join points on o1.deliverylocationid = points.id
         join goodstoorder on o1.id = goodstoorder.orderid
         join goods on goodstoorder.goodsid = goods.id
         join userprofile on o1.CUSTOMERPROFILEID = userprofile.id
         join userlogin on userprofile.userloginid = userlogin.ID
where o1.status = 'executed';

create or replace view orders_executed_grouped_view
as
select o1.ordername                                       as order_name,
       o1.orderdate                                       as order_date,
       o1.deliverydate                                    as delivery_date,
       o1.status                                          as order_status,
       o1.price                                           as order_price,
       o1.DELIVERYTYPE                                    as delivery_type,
       userlogin.login                                    as customer_login,
       user_package.get_executor_login_by_order_id(o1.id) as executor_login
from orders o1
         join points on o1.deliverylocationid = points.id
         join goodstoorder on o1.id = goodstoorder.orderid
         join goods on goodstoorder.goodsid = goods.id
         join userprofile on o1.CUSTOMERPROFILEID = userprofile.id
         join userlogin on userprofile.userloginid = userlogin.ID
where o1.status = 'executed'
group by  o1.ordername, o1.orderdate, o1.deliverydate, o1.status, o1.price,
          o1.deliverytype, userlogin.login, o1.id ;

