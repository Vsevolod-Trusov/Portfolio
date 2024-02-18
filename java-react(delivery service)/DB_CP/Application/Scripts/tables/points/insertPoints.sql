select * from points;
insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ( '���������� 21',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.88919185983302, 27.564432754093655, NULL),
                          NULL,
                          NULL),'user'
        );
commit;

insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ( '�� �. ������� 1',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.923418493813564, 27.54945859805855, NULL),
                          NULL,
                          NULL),'user'
        );
commit;

insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ( '�������� 2',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.907237, 27.626262, NULL),
                          NULL,
                          NULL), 'user'
        );
commit;

insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ( '�� ������� 3',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.902836, 27.556261, NULL),
                          NULL,
                          NULL), 'user'
        );
commit;

insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ( '�� �������� 4',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.893451, 27.484654, NULL),
                          NULL,
                          NULL), 'user'
        );
commit;

insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ( '����������� ����� 5',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.870467, 27.560519, NULL),
                          NULL,
                          NULL), 'user'
        );
commit;

--insert staff points
insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ('������������� 24',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.908069,27.527376, NULL),
                          NULL,
                          NULL), 'staff');
commit;

insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ( '��������� 15',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE( 53.896548,27.547779 , NULL),
                          NULL,
                          NULL), 'staff');
commit;

insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ('����� 20',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.900108,27.558122 , NULL),
                          NULL,
                          NULL), 'staff');
commit;
insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ('������������� 23',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.901209,27.559900 , NULL),
                          NULL,
                          NULL), 'staff');
commit;
insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ('�������� ������� 5',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.897469,27.600814 , NULL),
                          NULL,
                          NULL), 'staff');
commit;
insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ('������������ 2',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.891359,27.607400 , NULL),
                          NULL,
                          NULL), 'staff');

insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ('�������������� ����� 93',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.934312,27.539824 , NULL),
                          NULL,
                          NULL), 'staff');
commit;
insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ('���������� 74',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.926873,27.509787 , NULL),
                          NULL,
                          NULL), 'staff');

insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ('����������� 24',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.921516,27.499191 , NULL),
                          NULL,
                          NULL), 'staff');

insert into POINTS (POINT_NAME, LOCATION, TYPE)
values ( '����� ������ 5',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.921263,27.483248, NULL),
                          NULL,
                          NULL), 'staff');
commit;
--find distance between two points using roads

