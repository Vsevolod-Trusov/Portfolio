grant execute on utl_file to admin;
grant create any directory to admin;
grant read, write on directory dir to admin;

create or replace directory dir as 'dir';
drop directory dir;
drop directory course_dir_second;
drop directory course_dir;
select *
from ALL_DIRECTORIES;
declare
    f utl_file.file_type;
begin
    f := utl_file.fopen('ORACLE_BASE', 'import.txt', 'w');
    UTL_FILE.PUT_LINE(f, 'HELLO WORLD');
    UTL_FILE.FCLOSE(f);
    DBMS_OUTPUT.PUT_LINE('WRITE CLOSE');
end;

begin
    admin_package.goods_export;
end;


--готовый export xml
declare
    file1 utl_file.file_type;
    xrow  CLOB;
Begin
    file1 := UTL_FILE.FOPEN('ORACLE_BASE', 'goods_import.xml', 'w');

    SELECT XMLELEMENT(root, XMLAGG(XMLELEMENT(good,
                                              XMLFOREST(name, price, description)
        )
        )).getCLOBVal() AS xmlsads
    Into Xrow
    FROM goods g
    where rownum < 11;
    utl_file.put(file1, xrow);
    utl_file.fclose(file1);
END;
--импорт готов
declare
    file1 utl_file.file_type;
    xrow  CLOB;
BEGIN
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
    Utl_File.Fclose(File1);
End;
commit;
select *
from GOODS
where name = 'hammer';
delete
from goods;
commit;


declare
    file1 utl_file.file_type;
    xrow  CLOB ;
Begin
    file1 := UTL_FILE.FOPEN('ORACLE_BASE', 'orders_import.xml', 'w');

    SELECT XMLELEMENT(root, XMLAGG(XMLELEMENT(note,
                                              XMLELEMENT("NAME", order_name),
                                              XMLELEMENT("ORDER_DATE",order_date),
                                              XMLELEMENT("DELIVERY_DATE",delivery_date),
                                              XMLELEMENT("STATUS",order_status),
                                              XMLELEMENT("TYPE",delivery_type),
                                              XMLELEMENT("PRICE",order_price)

        )
        )).getCLOBVal() AS xmlsads
    Into Xrow
    FROM ORDERS_EXECUTED_VIEW orders where order_date > to_date('2022-12-12','YYYY-MM-DD')
    and  delivery_type = 'courier' group by order_name;
    utl_file.put(file1, xrow);
    utl_file.fclose(file1);
END;

select *
from orders_executed_view;
select *
from orders;