create or replace package user_package as
    --register user
    procedure register_user(get_login nvarchar2,
                            get_userpoint_name points.point_name%type,
                            password nvarchar2,
                            get_role nvarchar2,
                            get_email nvarchar2);
    --authorisation accaunt
    function authorization(get_login nvarchar2,
                           get_password nvarchar2) return sys_refcursor;
    --get cutomer info
    function get_customer_info(user_login userlogin.login%type) return sys_refcursor;
    --get count of unprocessed orders by login
    function get_orders_count_by_status_or_all(user_login userlogin.login%type,
                                               get_status orders.status%type default 'unprocessed',
                                               get_all nchar) return number;

    --add good to rder
    procedure add_good_to_order(order_name orders.ordername%type, good_name goods.name%type);
    --add goodstoorders
    procedure add_goods_to_order(order_id orders.id%type, good_id goods.id%type);
    --insert into orders table
    function insert_into_orders(customer_profile_id orders.customerprofileid%type,
                                executor_profile_id orders.excecutorprofileid%type,
                                start_deliverylocation orders.deliverylocationid%type,
                                order_status orders.status%type,
                                userlocation_id orders.userlocationid%type,
                                get_data_order orders.orderdate%type,
                                get_delivery_date orders.deliverydate%type,
                                get_delivery_type orders.deliverytype%type,
                                get_order_price orders.price%type
    ) return orders.id%type;

    --get executor login by order id
    function get_executor_login_by_order_id(order_id orders.id%type) return userlogin.login%type;
    --get routes by user login
    function get_routes_by_user_login(user_login userlogin.login%type) return sys_refcursor;


    --add order
    function add_order(customer_login userlogin.login%type, good_name goods.name%type,
                       get_data_order date default sysdate, get_delivery_date date,
                       get_delivery_type orders.deliverytype%type,
                       get_order_price orders.price%type,
                       get_delivery_point_pickup points.point_name%type) return orders.ordername%type;
    --get orders by login
    function get_orders_not_executed_by_login(user_login userlogin.login%type) return sys_refcursor;

    --get history
    function get_history_by_login(customer_login userlogin.login%type) return sys_refcursor;

    --get good by name
    function get_good_by_name(good_name goods.name%type) return sys_refcursor; --return goods%rowtype;

    --delete order
    procedure delete_order_by_name(order_name orders.ordername%type);
    --add review
    procedure add_review(get_content reviews.content%type, get_estimation reviews.estimation%type,
                         get_login userlogin.login%type);
------------support functions-----------------
    function encrypt_password(password varchar2) return userlogin.password%type;
    function dencrypt_password(password_hash varchar2) return varchar2;
end user_package;

create or replace package body user_package as
    --register user
    procedure register_user(get_login nvarchar2,
                            get_userpoint_name points.point_name%type,
                            password nvarchar2,
                            get_role nvarchar2,
                            get_email nvarchar2)
        is
        password_hash nvarchar2(200);
        userlogin_id  userlogin.id%type;
        userpoint_id  points.id%type;

        fk_exception exception;
        pragma exception_init (fk_exception, -2291);
    begin
        password_hash := encrypt_password(password);
        insert into userlogin (login, password, role) values (get_login, password_hash, get_role);

        select id into userlogin_id from userlogin where userlogin.login = get_login;
        select id into userpoint_id from points where rtrim(POINT_NAME) = rtrim(get_userpoint_name);
        insert into userprofile (email, userpointid, userloginid)
        values (get_email, userpoint_id, userlogin_id);
        commit;
    exception
        when no_data_found then rollback; raise no_data_found;
        when dup_val_on_index then rollback; raise_application_error(-20002, 'Such login or email already exists');
        when fk_exception then rollback; raise_application_error(-20003, 'Such login do not exist');
        when others then rollback;
        raise_application_error(-20001, sqlerrm);
    end register_user;

    --authorisation accaunt
    function authorization(get_login nvarchar2,
                           get_password nvarchar2) return sys_refcursor
        is
        login_role_cursor sys_refcursor;
        select_password   userlogin.password%type;
        decode_password   userlogin.password%type;

        no_such_profile_exception exception;
        pragma exception_init (no_such_profile_exception, 100);
    begin
        select password into select_password from userlogin where login = get_login;
        decode_password := dencrypt_password(select_password);
        if decode_password = get_password then
            open login_role_cursor for select login, role from userlogin where login = get_login;
            return login_role_cursor;
        else
            raise no_such_profile_exception;
        end if;
    exception
        when no_such_profile_exception then
            raise_application_error(-20002, 'Invalid login or password');
        when others then
            raise_application_error(-20001, sqlerrm);
    end authorization;

    function get_customer_info(user_login userlogin.login%type) return sys_refcursor
        is
        info_cursor sys_refcursor;
    begin
        open info_cursor for select get_orders_count_by_status_or_all(user_login, 'unprocessed', 'N') as unprocessed_orders,
                                    get_orders_count_by_status_or_all(user_login, 'processed', 'N')   as processed_orders,
                                    get_orders_count_by_status_or_all(user_login, get_all=>'Y')       as all_orders
                             from dual;
        return info_cursor;
    end;

    function get_orders_count_by_status_or_all(user_login userlogin.login%type,
                                               get_status orders.status%type default 'unprocessed',
                                               get_all nchar) return number
        is
        orders_count number;
        profile_id   orders.customerprofileid%type;
    begin
        select userprofile.id
        into profile_id
        from userprofile
                 join userlogin
                      on userprofile.userloginid = userlogin.id
        where userlogin.login = user_login;

        if get_all = 'Y' then
            select count(*)
            into orders_count
            from orders
            where customerprofileid = profile_id;
        else
            select count(*)
            into orders_count
            from orders
            where customerprofileid = profile_id
              and status = get_status;
        end if;
        return orders_count;
    end;

    --add good to order
    procedure add_good_to_order(order_name orders.ordername%type, good_name goods.name%type)
        is
        good_id goods.id%type;
    begin
        select id into good_id from goods where goods.name = good_name;
        add_goods_to_order(substr(order_name, 7), good_id);
    exception
        when no_data_found then
            rollback;
            raise_application_error(-20001, 'No such item');
    end;

    --add goodstoorder
    procedure add_goods_to_order(order_id orders.id%type, good_id goods.id%type)
        is
    begin
        insert into goodstoorder values (order_id, good_id);
        commit;
    end;

--get executor login by order id
    function get_executor_login_by_order_id(order_id orders.id%type) return userlogin.login%type
        is
        executor_login userlogin.login%type;
    begin
        select userlogin.login
        into executor_login
        from orders o2
                 join userprofile
                      on o2.excecutorprofileid = userprofile.id
                 join
             userlogin on userprofile.userloginid = userlogin.id
        where o2.id = order_id;
        return executor_login;
    exception
        when no_data_found then raise_application_error(-20001, 'No such order');
    end;

--get routes by user login
    function get_routes_by_user_login(user_login userlogin.login%type) return sys_refcursor
        is
        routes_by_login sys_refcursor;
        point_name      points.point_name%type;
    begin
        select points.point_name
        into point_name
        from points
                 join userprofile on userprofile.USERPOINTID = points.id
                 join userlogin on userlogin.id = userprofile.userloginid
        where userlogin.login = user_login;

        routes_by_login := general_package.get_route_length_analysis(point_name);
        return routes_by_login;
    exception
        when no_data_found then
            raise_application_error(-20001, 'Such user profile does not exist');
        when others then raise_application_error(-20000, 'Error in get_routes_by_user_login');
    end;




--insert into orders  table
    function insert_into_orders(customer_profile_id orders.customerprofileid%type,
                                executor_profile_id orders.excecutorprofileid%type,
                                start_deliverylocation orders.deliverylocationid%type,
                                order_status orders.status%type,
                                userlocation_id orders.userlocationid%type,
                                get_data_order orders.orderdate%type,
                                get_delivery_date orders.deliverydate%type,
                                get_delivery_type orders.deliverytype%type,
                                get_order_price orders.price%type) return orders.id%type
        is
        order_id orders.id%type;
    begin
        insert into orders (customerprofileid, excecutorprofileid, deliverylocationid, status, userlocationid,
                            orderdate, deliverydate, deliverytype, price)
        values (customer_profile_id, executor_profile_id, start_deliverylocation, order_status,
                userlocation_id,
                get_data_order, get_delivery_date, get_delivery_type, get_order_price)
        returning id into order_id;
        return order_id;
    end;

--add order
    function add_order(customer_login userlogin.login%type, good_name goods.name%type,
                       get_data_order date default sysdate, get_delivery_date date,
                       get_delivery_type orders.deliverytype%type,
                       get_order_price orders.price%type,
                       get_delivery_point_pickup points.point_name%type) return orders.ordername%type
        is
        customer_profile_id    userprofile.id%type;
        executor_profile_id    userprofile.id%type;
        order_id               orders.id%type;
        good_id                goods.id%type;
        start_deliverylocation orders.deliverylocationid%type;
        unprocessed_status     orders.status%type    := 'unprocessed';
        userlocation_id        points.id%type;
        order_name             orders.ordername%type := 'order';

        no_such_profile_exception exception;
        pragma exception_init (no_such_profile_exception, 100);
    begin
        select userprofile.id
        into customer_profile_id
        from userprofile
                 join userlogin
                      on userprofile.userloginid = userlogin.id
        where userlogin.login = customer_login;

        select userprofile.id
        into executor_profile_id
        from userprofile
                 join userlogin
                      on userprofile.userloginid = userlogin.id
        where userlogin.login = 'executor';

        select userprofile.userpointid
        into userlocation_id
        from userprofile
        where userprofile.id = customer_profile_id;


        if get_delivery_type = 'courier' then
            select points.id
            into start_deliverylocation
            from points
            where points.type = 'staff' fetch first 1 rows only;
            order_id := insert_into_orders(customer_profile_id, executor_profile_id, start_deliverylocation,
                                           unprocessed_status,
                                           userlocation_id,
                                           get_data_order, get_delivery_date, get_delivery_type, get_order_price);
        else
            select points.id
            into start_deliverylocation
            from points
            where points.type = 'staff'
              and points.point_name = get_delivery_point_pickup;
            unprocessed_status := 'processed';
            order_id := insert_into_orders(customer_profile_id, executor_profile_id, start_deliverylocation,
                                           unprocessed_status,
                                           userlocation_id,
                                           get_data_order, get_delivery_date, get_delivery_type, get_order_price);
        end if;

        order_name := 'order_' || order_id;
        update orders set ORDERNAME= order_name where orders.id = order_id;
        commit;

        select goods.id into good_id from goods where goods.name = good_name;
        user_package.add_goods_to_order(order_id, good_id);
        return order_name;
    exception
        when no_such_profile_exception then
            rollback;
            raise_application_error(-20003, 'Such profile does not exist');
        when dup_val_on_index then rollback;
        raise_application_error(-20002, 'Such order already exist');
        when others then
            rollback;
            raise_application_error(-20001, sqlerrm);
    end add_order;


--get orders by login
    function get_orders_not_executed_by_login(user_login userlogin.login%type) return sys_refcursor
        is
        orders_cursor sys_refcursor;
    begin
        open orders_cursor for select *
                               from orders_not_executed_view
                               where orders_not_executed_view.customer_login = user_login;
        return orders_cursor;
    end get_orders_not_executed_by_login;



--get customer history
    function get_history_by_login(customer_login userlogin.login%type) return sys_refcursor
        is
        history_cursor sys_refcursor;
    begin
        open history_cursor for select *
                                from history_view
                                where history_view.user_login = customer_login;
        return history_cursor;
    end get_history_by_login;

--get good by name
    function get_good_by_name(good_name goods.name%type) return sys_refcursor
        is
        cursor_good sys_refcursor;
    begin
        open cursor_good for select * from goods where goods.name = good_name;
        return cursor_good;
    exception
        when no_data_found then raise_application_error(-20001, 'Such good does not exist');
    end;

--delete order by id
    procedure delete_order_by_name(order_name orders.ordername%type)
        is
        order_id orders.id%type;
    begin
        select orders.id into order_id from orders where orders.ORDERNAME = order_name;
        delete from orders where orders.ordername = order_name;
        commit;
    exception
        when no_data_found then raise_application_error(-20001, 'Such order does not exist');
    end delete_order_by_name;

--add review
    procedure add_review(get_content reviews.content%type, get_estimation reviews.estimation%type,
                         get_login userlogin.login%type)
        is
        userprofile_id userprofile.id%type;

    begin
        select userprofile.id
        into userprofile_id
        from userprofile
                 join userlogin
                      on userprofile.userloginid = userlogin.id
        where userlogin.login = get_login;

        insert into reviews (content, estimation, userprofileid)
        values (get_content, get_estimation, userprofile_id);
        commit;
    exception
        when no_data_found then
            rollback;
            raise_application_error(-20002, 'Such profile does not exist');
        when others then
            rollback;
            raise_application_error(-20001, sqlerrm);
    end add_review;

    ------------support functions-----------------
    function encrypt_password(password varchar2) return userlogin.password%type
        is
        hash_password userlogin.password%type;
    begin
        hash_password := utl_encode.text_encode(password, 'AL32UTF8',
                                                UTL_ENCODE.BASE64);
        return hash_password;
    end encrypt_password;

    function dencrypt_password(password_hash varchar2) return varchar2
        is
    begin
        return utl_encode.text_decode(password_hash, 'AL32UTF8',
                                      UTL_ENCODE.BASE64);
    end dencrypt_password;
end user_package;
