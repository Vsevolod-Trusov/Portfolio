select *
from user_objects
where OBJECT_NAME like '%ADMIN_PACKAGE%'
  and object_type = 'PACKAGE';

drop package admin_package;

create or replace package admin_package is
    --load rows
    procedure load_rows;
    --get executed orders
    function get_executed_orders return sys_refcursor;
    --get count of executed orders
    function get_count_executed_orders_by_executor_login_id(user_login_id userlogin.id%type) return number;
    --get staff info
    function get_staff_info return sys_refcursor;
    --delete goods
    procedure delete_goods;
    --export
    procedure orders_export;
    --import
    procedure goods_import;
    --delete reviews
    procedure delete_reviews;
    --get admin info
    function get_admin_info return sys_refcursor;
    --get count of users
    function get_user_count return number;
    --get count of staff
    function get_count_staff return number;
    --get count of unprocessed orders
    function get_count_unprocessed_orders return number;
    --get cout of orders by executor login
    function get_count_orders_by_executor_login_id(userlogin_id userlogin.id%type) return number;
    --get userlocation by order id
    function get_userlocation_by_order_id(order_id orders.id%type) return points.point_name%type;
    --get userlogin by order id
    function get_customerlogin_by_order_id(order_id orders.id%type) return userlogin.login%type;
    --get all notes by role
    function get_all_persons_by_role(role nvarchar2) return sys_refcursor;
    --get all points name
    function get_all_points_name return sys_refcursor;


    --get executors by point name
    function get_executors_by_point_name(get_point_name points.point_name%type) return sys_refcursor;

    --add good
    procedure add_good(good_name goods.name%type,
                       good_description goods.description%type,
                       good_price goods.price%type);
    --delete good by name
    procedure delete_good_by_name(good_name goods.name%type);


    --get unprocessed orders
    function get_unprocessed_orders return sys_refcursor;

    --change order executor and delivery location
    procedure update_order_executor_deliverypoint(order_name orders.ordername%type,
                                                  order_executor_login userlogin.login%type,
                                                  deliverypoint_name points.point_name%type,
                                                  get_order_price orders.price%type);


end admin_package;


create or replace package body admin_package is
    --load rows
    procedure load_rows is
        item_price number(5, 2) := 2.5;
    begin
        for i in 1..100000
            loop
                if mod(i, 100) = 0 then
                    item_price := item_price + 0.5;
                end if;
                insert into GOODS (name, description, price)
                values ('item' || i, 'description...', item_price);
            end loop;
        commit;
    end;
    --get executed orders
    function get_executed_orders return sys_refcursor is
        executed_orders_cursor sys_refcursor;
    begin
        open executed_orders_cursor for
            select * from orders_executed_view;
        return executed_orders_cursor;
    end;
    --get count of executed orders
    function get_count_executed_orders_by_executor_login_id(user_login_id userlogin.id%type) return number
        is
        order_counter number;
    begin
        select count(*)
        into order_counter
        from orders
                 join userprofile on ORDERS.EXCECUTORPROFILEID = USERPROFILE.ID
                 join userlogin ul1
                      on ul1.id = userprofile.USERLOGINID
        where ul1.login != 'executor'
          and ul1.id = user_login_id
          and orders.status = 'executed';
        return order_counter;
    exception
        when no_data_found then raise_application_error(-20001, 'No such login');
    end;

    function get_staff_info return sys_refcursor is
        staff_info_cursor sys_refcursor;
    begin
        open staff_info_cursor for select login,
                                          get_count_executed_orders_by_executor_login_id(ul2.id) as orders_count
                                   from userlogin ul2
                                            join userprofile on ul2.id = userprofile.userloginid
                                   where ul2.role = 'staff'
                                     and ul2.login != 'executor'
                                   order by orders_count desc;
        return staff_info_cursor;
    end;

    procedure delete_goods
        is
    begin
        delete from goods;
        commit;
    end;
    --export
    procedure orders_export is
        file1 utl_file.file_type;
        xrow  CLOB ;
    Begin
        file1 := UTL_FILE.FOPEN('ORACLE_BASE', 'orders_export.xml', 'w');

        SELECT XMLELEMENT(root, XMLAGG(XMLELEMENT(note,
                                                  XMLELEMENT("NAME", order_name),
                                                  XMLELEMENT("ORDER_DATE", order_date),
                                                  XMLELEMENT("DELIVERY_DATE", delivery_date),
                                                  XMLELEMENT("STATUS", order_status),
                                                  XMLELEMENT("TYPE", delivery_type),
                                                  XMLELEMENT("PRICE", order_price),
                                                  XMLELEMENT("CUSTOMER", customer_login),
                                                  XMLELEMENT("EXECUTOR", executor_login)
            )
            )).getCLOBVal() AS xmlsads
        Into Xrow
        FROM ORDERS_EXECUTED_GROUPED_VIEW orders
        where delivery_date > to_date('2022-12-13', 'YYYY-MM-DD')
          and delivery_type = 'courier';
        utl_file.put(file1, xrow);
        utl_file.fclose(file1);
    end;

    --import
    procedure goods_import
        is
        file1 utl_file.file_type;
        xrow  CLOB;
    begin
        file1 := UTL_FILE.FOPEN('ORACLE_BASE', 'goods_import.xml', 'r');
        utl_file.get_line(file1, xrow);

        merge INTO Goods cur_t
        USING
            (Select Extractvalue(Value(T), '//NAME')        name,
                    extractValue(value(t), '//PRICE')       price,
                    Extractvalue(Value(T), '//DESCRIPTION') description
             FROM TABLE (XMLSequence(XMLType(xrow).extract('//GOOD'))) t) imp_t
        ON (cur_t.name = imp_t.name)
        WHEN NOT matched THEN
            INSERT
            (Cur_T.name,
             cur_t.price,
             cur_t.DESCRIPTION)
            VALUES (imp_t.name,
                    Imp_T.price,
                    Imp_T.description);
        Utl_File.fclose(File1);
    end;

    --delete reviews
    procedure delete_reviews
        is
    begin
        delete from reviews;
        commit;
    end;
    --get admin info
    function get_admin_info return sys_refcursor
        is
        info_cursor sys_refcursor;
    begin
        open info_cursor for select get_user_count               as user_count,
                                    get_count_staff              as staff_count,
                                    get_count_unprocessed_orders as unprocessed_orders_count
                             from dual;
        return info_cursor;
    end;
    function get_user_count return number
        is
        user_count number;
    begin
        select count(*) into user_count from userlogin where role = 'user';
        return user_count;
    end;
    --get count of staff
    function get_count_staff return number
        is
        staff_count number;
    begin
        select count(*) into staff_count from userlogin where role = 'staff' and login != 'executor';
        return staff_count;
    end;
    --get count of unprocessed orders
    function get_count_unprocessed_orders return number
        is
        unprocessed_orders_count number;
    begin
        select count(*) into unprocessed_orders_count from orders where status = 'unprocessed';
        return unprocessed_orders_count;
    end;
    --get executor login by order id
    function get_count_orders_by_executor_login_id(userlogin_id userlogin.id%type) return number
        is
        order_counter number;
    begin
        select count(*)
        into order_counter
        from orders
                 join userprofile on ORDERS.EXCECUTORPROFILEID = USERPROFILE.ID
                 join userlogin ul1
                      on ul1.id = userprofile.USERLOGINID
        where ul1.login != 'executor'
          and ul1.id = userlogin_id
          and orders.status != 'executed';
        return order_counter;
    exception
        when no_data_found then raise_application_error(-20001, 'No such login');
    end;
    --get userlocation by order id
    function get_userlocation_by_order_id(order_id orders.id%type) return points.point_name%type
        is
        point_name points.point_name%type;
    begin
        select points.point_name
        into point_name
        from points
                 join orders o2
                      on o2.userlocationid = points.id
        where o2.id = order_id;
        return point_name;
    exception
        when no_data_found then raise_application_error(-20001, 'No such order');
    end;
    --get userlogin by order id
    function get_customerlogin_by_order_id(order_id orders.id%type) return userlogin.login%type
        is
        get_login userlogin.login%type;
    begin
        select userlogin.login
        into get_login
        from orders o2
                 join userprofile
                      on o2.customerprofileid = userprofile.id
                 join
             userlogin on userprofile.userloginid = userlogin.id
        where o2.id = order_id;
        return get_login;
    exception
        when no_data_found
            then raise_application_error(-20001, 'No such order');
    end;
    --get executors by point name
    function get_executors_by_point_name(get_point_name points.point_name%type) return sys_refcursor
        is
        point_id         points.id%type;
        executors_cursor sys_refcursor;
        no_such_executors exception;
        pragma exception_init (no_such_executors, -20001);

    begin
        select id into point_id from points where points.point_name = get_point_name;
        open executors_cursor for select login,
                                         get_count_orders_by_executor_login_id(ul2.id) as orders_count
                                  from userlogin ul2
                                           join userprofile on ul2.id = userprofile.userloginid
                                  where ul2.role = 'staff'
                                    and USERPROFILE.USERPOINTID = point_id
                                    and ul2.login != 'executor';
        return executors_cursor;
    exception
        when no_data_found then
            raise_application_error(-20001, 'Such delivery point does not exist');
        when others then
            raise_application_error(-20000, 'get_executors_by_point_name error');
    end;


    --delete good by name
    procedure delete_good_by_name(good_name goods.name%type)
        is
        good_id goods.id%type;
    begin
        select id into good_id from goods where name = good_name;
        delete from goods where id = good_id;
        commit;
    exception
        when no_data_found then
            raise_application_error(-20002, 'Such good does not exist');
        when others then
            raise_application_error(-20001, 'Error in delete_good_by_name');
    end;
--get all point names
    function get_all_points_name return sys_refcursor
        is
        cursor_name sys_refcursor;
    begin
        open cursor_name for select * from all_points_names_view;

        return cursor_name;
    end;
    --get all notes by role
    function get_all_persons_by_role(role nvarchar2)
        return sys_refcursor
        is
        table_info sys_refcursor;
    begin
        open table_info
            for select login from userlogin where UserLogin.ROLE = role;
        return table_info;
    end get_all_persons_by_role;


--add good
    procedure add_good(good_name goods.name%type,
                       good_description goods.description%type,
                       good_price goods.price%type)
        is
    begin
        insert into goods (name, description, price)
        values (good_name, good_description, good_price);
        commit;
    exception
        when dup_val_on_index then rollback; raise_application_error(-20002, 'Such good name already exists');
    end add_good;


    --get unprocessed orders
    function get_unprocessed_orders return sys_refcursor
        is
        unprocessed_orders_cursor sys_refcursor;
    begin
        open unprocessed_orders_cursor for select * from unprocessed_orders_view;
        return unprocessed_orders_cursor;
    end;

    procedure update_order_executor_deliverypoint(order_name orders.ordername%type,
                                                  order_executor_login userlogin.login%type,
                                                  deliverypoint_name points.point_name%type,
                                                  get_order_price orders.price%type)
        is
        order_executor_id orders.excecutorprofileid%type;
        deliverypoint_id  orders.DELIVERYLOCATIONID%type;

        fk_exception exception;
        pragma exception_init (fk_exception, -2291);

    begin
        select userprofile.id
        into order_executor_id
        from userprofile
                 join userlogin
                      on userprofile.userloginid = userlogin.id
        where userlogin.login = order_executor_login;

        select points.id into deliverypoint_id from points where points.point_name = deliverypoint_name;

        update orders
        set Orders.Status= 'processed',
            ORDERS.EXCECUTORPROFILEID = order_executor_id,
            orders.DELIVERYLOCATIONID = deliverypoint_id,
            orders.price = get_order_price
        where orders.ordername = order_name;

    exception
        when no_data_found then raise no_data_found;
        when fk_exception then rollback;
        raise_application_error(-20002, 'Delivery point or executor profile does not exist');
        when others then raise_application_error(-20001, sqlerrm);
    end update_order_executor_deliverypoint;
end admin_package;



