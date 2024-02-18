create or replace package staff_package as
    --get processed orders count
    function get_processed_orders_count_by_login(staff_login userlogin.login%type) return number;

    --get orders processed
    function get_processed_order_to_staff_by_login(staff_login userlogin.login%type) return sys_refcursor;
end staff_package;


create or replace package body staff_package as
     function get_processed_orders_count_by_login(staff_login userlogin.login%type) return number
         is
         count_orders number;
         profile_id orders.EXCECUTORPROFILEID%type;
             begin
                 select userprofile.id into profile_id from userprofile join userlogin
                                                   on userprofile.userloginid = userlogin.id
                                                   where userlogin.login = staff_login;
                    select count(*) into count_orders from orders where status = 'processed' and EXCECUTORPROFILEID = profile_id;
                 return count_orders;
                 end;

    --get processed orders to staff
        function get_processed_order_to_staff_by_login(staff_login userlogin.login%type) return sys_refcursor
        is
        processed_orders_cursor sys_refcursor;
    begin
        open processed_orders_cursor for select * from processed_orders_view
                                           where processed_orders_view.executor_login = staff_login;
        return processed_orders_cursor;
        exception when no_data_found then
            raise_application_error(-20001, 'Such staff profile does not exist');
            when others then raise_application_error(-20000, 'Getting orders failed');
        end;



end staff_package;