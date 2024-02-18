--drop spatial indexes
drop index ROADS_SP_Index ;
drop index DeliveryPoints_SP_Index ;
drop index USERPOINTS_SP_INDEX ;
drop index SHAPES_SP_INDEX ;
--alter spatial indexes
alter index ROADS_SP_Index rebuild;
alter index DeliveryPoints_SP_Index rebuild;
alter index USERPOINTS_SP_INDEX rebuild;
alter index SHAPES_SP_INDEX rebuild;