create or replace package general_package as
    --count rows of Goods table for pagination
    function count_rows_of_goods return number;
    --get pagination goods between start value and end value
    function get_pagination_goods(start_value number, end_value number) return sys_refcursor;
    --get reviews
    function get_reviews return sys_refcursor;
    --change order status by id
    procedure change_order_status_by_name(order_name orders.ordername%type,
                                          get_status orders.status%type);
    --get analise abount customer poin and all delivery points
    function get_route_length_analysis(customer_point_name points.point_name%type) return sys_refcursor;
--get_distance_line
    function get_distance_between_deliverypoint_customer(delivery_point_name POINTS.POINT_NAME%type,
                                                         customer_location_name POINTS.POINT_NAME%type) return number;
end general_package;

create or replace package body general_package as
    --count rows of goods table
    function count_rows_of_goods return number
        is
        row_count number;
    begin
        select count(*) into row_count from goods;
        return row_count;
    end;

    --get pagination goods between start value and end value
    function get_pagination_goods(start_value number, end_value number) return sys_refcursor
        is
        get_pagination_goods_cursor sys_refcursor;
        row_count                   number;
        wrong_input_data exception;
    begin
         row_count:= count_rows_of_goods ;
        /*if start_value > row_count then
            raise wrong_input_data;
        end if;*/

        if start_value < 0 or end_value < 0 then
            raise wrong_input_data;
        elsif start_value > end_value then
            raise wrong_input_data;
        end if;

        open get_pagination_goods_cursor for
            select *
            from (select goods.*,
                         ROWNUM rnum
                  from (select * from goods order by price,name) goods
                  where ROWNUM <= end_value)
                    where  rnum >= start_value;
        return get_pagination_goods_cursor;
    exception
        when wrong_input_data then
            raise_application_error(-20001, 'Wrong input data');
    end get_pagination_goods;

    --get reviews
    function get_reviews
        return sys_refcursor
        is
        cursor_reviews sys_refcursor;
    begin
        open cursor_reviews
            for select * from reviews_view;
        return cursor_reviews;
    end get_reviews;

    --change order status by id
    procedure change_order_status_by_name(order_name orders.ordername%type,
                                          get_status orders.status%type)
        is
    begin
        update orders set status = get_status where orders.ordername = order_name;
        commit;
    exception
        when
            others then rollback; raise_application_error(-20001, 'Updating order failed');
    end change_order_status_by_name;
--get analysis
    function get_route_length_analysis(customer_point_name points.point_name%type) return sys_refcursor
        is
        analysys_route_length_cursor sys_refcursor;
    begin
        open analysys_route_length_cursor for select p2.point_name                                                    as delivery_point,
                                                     get_distance_between_deliverypoint_customer(p2.point_name,
                                                                                                 customer_point_name) as distance,
                                                     count(*)                                                         as staff_count
                                              from userprofile
                                                       join points p1
                                                            on userprofile.USERPOINTID = p1.id
                                                       join userlogin on
                                                  userprofile.USERLOGINID = userlogin.id
                                                       join points p2 on p2.id = userprofile.USERPOINTID
                                              where p2.type = 'staff'
                                                and userlogin.role = 'staff'
                                                and userlogin.login != 'executor'
                                              group by p2.point_name, customer_point_name;
        return analysys_route_length_cursor;
    exception
        when no_data_found then raise_application_error(-20001, 'Such customer point does not exist');
    end;

    --get_distance_line
    function get_distance_between_deliverypoint_customer(delivery_point_name POINTS.POINT_NAME%type,
                                                         customer_location_name POINTS.POINT_NAME%type) return number
        is
        distance       number;
        delivery_point points.location%type;
        customer_point points.location%type;
    begin
        select location
        into delivery_point
        from points
        where points.type = 'staff'
          and rtrim(POINT_NAME) = rtrim(delivery_point_name);
        select location
        into customer_point
        from points
        where points.type = 'user'
          and rtrim(POINT_NAME) = rtrim(customer_location_name);

        select sdo_geom.sdo_distance(delivery_point, customer_point, 0.01, 'unit=km')
        into distance from dual;
        return distance;
    exception
        when no_data_found then raise_application_error(-20002, 'Such delivery or customer point do not exist');
        when others then raise_application_error(-20001, sqlerrm);
        return -1;
    end get_distance_between_deliverypoint_customer;

end general_package;