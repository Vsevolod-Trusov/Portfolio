--test change order status
declare
order_id orders.id%type := 'EDFD8BA561310525E053020014AC586C';
begin
staff_package.change_order_status_by_id(order_id, 'executed');
end;

insert into reviews(content, ESTIMATION, USERPROFILEID)
values('Cool pen', 9, 'EDFAC68166D503A7E053020014AC8410');
commit;
select * from USERPROFILE;

--test get_reviews
declare
 test_reviews_cursor sys_refcursor;
 estimation reviews.estimation%type;
 content reviews.content%type;
 login userlogin.login%type;
begin
test_reviews_cursor := staff_package.get_reviews();
fetch test_reviews_cursor into content,estimation, login;
while test_reviews_cursor%found
    loop
    DBMS_OUTPUT.put_line(content||' '||estimation||' '||login);
fetch test_reviews_cursor into content,estimation, login;
    end loop;
end;

begin
    dbms_output.put_line(STAFF_PACKAGE.GET_STRING());
end;

--test staff info
begin
    dbms_output.put_line(STAFF_PACKAGE.get_processed_orders_count_by_login('bob'));
end;