--alter index <index_name> rebuild
select * from USER_SDO_INDEX_INFO;
select * from user_sdo_geom_metadata;
delete from user_sdo_geom_metadata;
select * from user_tables;
--creating spatial index fot table shapes
INSERT INTO USER_SDO_GEOM_METADATA(TABLE_NAME, COLUMN_NAME, DIMINFO, SRID)
VALUES ('SHAPES', 'AREA', MDSYS.SDO_DIM_ARRAY(MDSYS.SDO_DIM_ELEMENT('X', -180, 180, 0.005),
                                     MDSYS.SDO_DIM_ELEMENT('Y', -90, 90, 0.005)),
        4326);
DELETE FROM USER_SDO_GEOM_METADATA WHERE TABLE_NAME = 'SHAPES';
COMMIT;
drop index SHAPES_SP_Index;
create index SHAPES_SP_Index on SHAPES(AREA)
  indextype is mdsys.spatial_index;

--creating spatial index fot table POINTS
INSERT INTO USER_SDO_GEOM_METADATA(TABLE_NAME, COLUMN_NAME, DIMINFO, SRID)
VALUES ('POINTS', 'LOCATION', MDSYS.SDO_DIM_ARRAY(MDSYS.SDO_DIM_ELEMENT('X', -180, 180, 0.005),
                                     MDSYS.SDO_DIM_ELEMENT('Y', -90, 90, 0.005)),
        4326);
DELETE FROM USER_SDO_GEOM_METADATA WHERE TABLE_NAME = 'POINTS';
COMMIT;
drop index Points_SP_Index;
create index Points_SP_Index on POINTS(LOCATION)
  indextype is mdsys.spatial_index;
--creating spatial index fot table roads
INSERT INTO USER_SDO_GEOM_METADATA(TABLE_NAME, COLUMN_NAME, DIMINFO, SRID)
VALUES ('ROADS', 'ROAD', MDSYS.SDO_DIM_ARRAY(MDSYS.SDO_DIM_ELEMENT('X', -180, 180, 0.005),
                                     MDSYS.SDO_DIM_ELEMENT('Y', -90, 90, 0.005)),
        4326);
DELETE FROM USER_SDO_GEOM_METADATA WHERE TABLE_NAME = 'ROADS';
COMMIT;
drop index ROADS_SP_Index;
create index ROADS_SP_Index on ROADS(ROAD)
  indextype is mdsys.spatial_index;