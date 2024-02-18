--insert into UserLogin;
insert into UserLogin (LOGIN, PASSWORD, ROLE) values ('user1', 'pass1','user');
select * from UserLogin;
commit;

--insert into SHAPE
--points

insert into SHAPES (SHAPE_NAME, AREA)
values ('MINSK_POLYGON', MDSYS.SDO_GEOMETRY(
    2003, 4326, NULL, MDSYS.SDO_ELEM_INFO_ARRAY(1, 1003, 1),
    SDO_ORDINATE_ARRAY(53.836042, 27.651157,
        53.833242, 27.552690,
        53.841292, 27.480323,
        53.844792, 27.448885,
        53.853890, 27.431683,
        53.903544, 27.407363,
        53.934984, 27.425158,
        53.963958, 27.465494,
        53.971634, 27.586501,
        53.944062, 27.670139,
        53.880473, 27.696238,
        53.836042, 27.651157
        )
    ));
commit;






