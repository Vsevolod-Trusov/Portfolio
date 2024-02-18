--test getting distance
declare
    distance number;
begin
    --distance := user_package.get_distance_between_deliverypoint_customer('Ленина 20', 'Беларуская 21');
    distance := user_package.get_distance_between_deliverypoint_customer('asdfgh', 'Беларуская 21');
    dbms_output.put_line(distance);
end;

declare
    history       sys_refcursor;
    good_name     goods.name%type;
    order_date    orders.ORDERDATE%type;
    delivery_date orders.DELIVERYDATE%type;
    status        HISTORY.STATUS%type;
begin
    history := user_package.GET_HISTORY_BY_LOGIN('user');
    fetch history into good_name;
    dbms_output.put_line(good_name);
end;
--test add review
declare
    estimation number := 9;
begin
    user_package.add_review('Very cool pen', estimation, 'vsevolod');
end;

--test get goods
declare
    good sys_refcursor;
    row  goods%rowtype;
begin
    good := USER_PACKAGE.GET_ALL_GOODS();
    fetch good into row;
    while good%found
        loop
            dbms_output.put_line(row.id);
            fetch good into row;
        end loop;
end;

declare
    userprofile_id userprofile.id%type;
    no_such_profile_exception exception;
    pragma exception_init (no_such_profile_exception, 100);
begin
    select userprofile.id
    into userprofile_id
    from userprofile
             join userlogin on userprofile.USERLOGINID = userlogin.id
    where userlogin.login = '';
exception
    when no_such_profile_exception then dbms_output.put_line('error');
end;

declare
    cur_goods   sys_refcursor;
    name        goods.name%type;
    price       goods.price%type;
    description goods.description%type;

begin
    cur_goods := general_package.get_pagination_goods(8, 14);
fetch cur_goods into name, price, description;
    while cur_goods%found
        loop
            dbms_output.put_line(name);
            fetch cur_goods into name, price, description;
        end loop;
end;

--test add order and add good to order
declare
    order_name                orders.ordername%type    := 'order_EF43821747E4112AE053020014ACAF71';
    cust_login                userlogin.login%type     := 'user';
    good_name                 goods.name%type          := 'item8';
    data_order                orders.orderdate%type    := sysdate;
    delivery_date             orders.deliverydate%type := sysdate;
    get_delivery_type         orders.deliverytype%type := 'courier';
    price                     orders.price%type        := 12.25;
    get_delivery_point_pickup points.point_name%type   := 'Ленина 20';
    good_id                   goods.id%type;
begin

    order_name := user_package.add_order(cust_login, good_name,
                                         data_order, delivery_date,
                                         get_delivery_type,
                                         price,
                                         get_delivery_point_pickup);

    dbms_output.put_line(substr(order_name, 7));
    select id into good_id from goods where name = 'item9';
    user_package.ADD_GOODS_TO_ORDER(substr(order_name, 7), good_id);
end;

--get goods by order id
declare
    order_id orders.id%type := 'EF43821747E4112AE053020014ACAF71';
begin
    null;
end;

select orders.ORDERNAME, count(*) as goods_count
from orders
         join GOODSTOORDER G
              on ORDERS.ID = G.ORDERID
group by orders.ORDERNAME;

select goods.name
from goods
         join goodstoorder on GOODS.ID = GOODSTOORDER.GOODSID
where GOODSTOORDER.ORDERID = 'EF43821747E4112AE053020014ACAF71';

--test add good to order using procedure
begin
    user_package.ADD_GOOD_TO_ORDER('order_EF48651A6DFC1770E053020014AC8389', 'item13');
end;
select *
from ORDERS_NOT_EXECUTED_VIEW;

delete
from orders;
commit;

--test get admin info
declare
    cutomer_info sys_refcursor;
    unprocessed  number;
    processed    number;
    all_count    number;
begin
    cutomer_info := user_package.get_customer_info('user');
    loop
        fetch cutomer_info into unprocessed, processed, all_count;
        exit when cutomer_info%notfound;
        dbms_output.put_line(unprocessed || ' ' || processed || ' ' || all_count);
    end loop;
end;

declare
    count_orders number;
begin
    select count(*)
    into count_orders
    from orders
             join userprofile on orders.CUSTOMERPROFILEID = userprofile.id
             join userlogin on userprofile.USERLOGINID = userlogin.id
    where userlogin.login = 'user';
    dbms_output.put_line(count_orders);
end;

