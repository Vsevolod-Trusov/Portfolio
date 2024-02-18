drop trigger add_in_history_table_after_adding_in_orders_trigger ;
create or replace trigger add_in_history_table_after_adding_in_orders_trigger
    after insert
    or update on orders
    for each row
begin
  if inserting then
    insert into HISTORY(orderid)
    VALUES (:new.id);
    end if;
end add_in_history_table_after_adding_in_orders_trigger;

select * from user_triggers;