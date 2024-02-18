select * from roads where sdo_relate((select points.location from points fetch first 1 row only),
    roads.road, 'mask=anyinteract') = 'TRUE';
select * from roads where sdo_relate((select points.location from points fetch first 1 row only),
    roads.road, 'mask=anyinteract') = 'TRUE';