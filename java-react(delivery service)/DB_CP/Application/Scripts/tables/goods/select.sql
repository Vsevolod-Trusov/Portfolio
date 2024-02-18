select *
  from ( select
  info.*, ROWNUM rnum
      from ( select * from points) info
      where ROWNUM <=200 )
where rnum  >= 100;

delete from goods;
declare
    row_count number;
begin
     select count(*) into row_count from goods;
     dbms_output.put_line(row_count);
end;
