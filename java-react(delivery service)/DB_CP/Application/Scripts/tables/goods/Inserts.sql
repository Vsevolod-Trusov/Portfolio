insert into GOODS (name, description, price)
values ('pencil', 'for 3 days', 2.2);
commit;

--inserting into goods table
declare
    item_price number(5, 2) := 2.5;
begin
    for i in 1..100000
        loop
            if mod(i,100)= 0 then
                item_price := item_price + 0.5;
            end if;
            insert into GOODS (name, description, price)
            values ('item' || i, 'description...', item_price);
        end loop;
    commit;
end;
delete from goods;
commit;

select * from GOODS;
select * from userprofile;
select * from userlogin;

insert into goods (name, description, price) values ('pencil', 'pencil', 0.5);
insert into goods (name, description, price) values ('pen', 'pen', 0.5);
insert into goods (name, description, price) values ('bag', 'bag', 1.5);
insert into goods (name, description, price) values ('bottle', 'bottle', 1);
insert into goods (name, description, price) values ('key', 'key', 1);
insert into goods (name, description, price) values ('rope', 'rope', 1);
insert into goods (name, description, price) values ('bow', 'bow', 0.8);
insert into goods (name, description, price) values ('ball', 'ball', 1.5);
insert into goods (name, description, price) values ('basket', 'basket', 1.5);
commit;

