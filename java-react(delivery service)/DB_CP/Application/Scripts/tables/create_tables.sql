select *  from user_tables;
---drop tables---
drop table UserLogin;
drop table UserProfile;
drop table Goods;
drop table Reviews;

drop table Orders;
drop table GoodsToOrder;
drop table History;
drop table Points;
---drop tables---`
CREATE TABLE UserLogin(
    ID RAW(32) DEFAULT SYS_GUID(),
    LOGIN NVARCHAR2(20) default null unique,
    PASSWORD NVARCHAR2(200) default null,
    ROLE NVARCHAR2(5) default 'user',
    CONSTRAINT PK_USERLOGIN_ID PRIMARY KEY(ID),
    CONSTRAINT CHECK_USERLOGIN_ROLE CHECK(ROLE like 'admin' OR
                                          ROLE like 'user' OR ROLE like 'staff')
);


CREATE TABLE UserProfile(
    ID RAW(32) DEFAULT SYS_GUID(),
    EMAIL NVARCHAR2(50) default null unique,
    USERLOGINID RAW(32) DEFAULT SYS_GUID(),
    USERPOINTID RAW(32) DEFAULT SYS_GUID(),
    CONSTRAINT PK_USERPROFILE_ID primary key(ID),
    CONSTRAINT FK_USERPROFILE_USERLOGINID foreign key(USERLOGINID) references UserLogin(ID) on delete cascade ,
    constraint FK_USERPROFILE_USERPOINTID foreign key(USERPOINTID) references POINTS(ID)
);
CREATE TABLE Goods(
    ID RAW(32) DEFAULT SYS_GUID(),
    NAME NVARCHAR2(20) unique,
    DESCRIPTION NVARCHAR2(300) default null,
    PRICE NUMBER (5,2),
    CONSTRAINT PK_GOODS_ID primary key(ID)
);
--alter table GOODS add CONSTRAINT UNIQUE_GOODS_NAME unique (NAME);

CREATE TABLE Reviews(
    ID RAW(32) DEFAULT SYS_GUID(),
    CONTENT NVARCHAR2(300) default 'Goood!',
    ESTIMATION NUMBER,
    USERPROFILEID RAW(32) DEFAULT SYS_GUID(),
    CONSTRAINT PK_REVIEWS_ID primary key (ID),
    CONSTRAINT FK_REVIEWS_USERPROFILEID foreign key(USERPROFILEID)
        references UserProfile(ID) on delete cascade
);


CREATE TABLE POINTS
(
    ID RAW(32) DEFAULT SYS_GUID(),
    LOCATION SDO_GEOMETRY,
    POINT_NAME nvarchar2(100) unique not null,
    TYPE nvarchar2(10) not null,
    CONSTRAINT PK_POINTS_ID primary key (ID),
    CONSTRAINT CHECK_POINTS_TYPE CHECK(TYPE like 'staff' OR TYPE like 'user')
);

/*CREATE TABLE Links(
    ID RAW(32) DEFAULT SYS_GUID(),
    STARTPOINTID RAW(32) DEFAULT SYS_GUID(),
    ENDPOINTID RAW(32) DEFAULT SYS_GUID(),
    CONSTRAINT PK_LINKS_ID primary key (ID),
    CONSTRAINT FK_LINKS_ENDPOINTID foreign key (ENDPOINTID) references POINTS(ID),
    CONSTRAINT FK_LINKS_STARTPOINTID foreign key (STARTPOINTID) references POINTS(ID)
);*/

CREATE TABLE GoodsToOrder(
    ORDERID RAW(32) DEFAULT SYS_GUID(),
    GOODSID RAW(32) DEFAULT SYS_GUID(),
    CONSTRAINT FK_GOODSTOORDER_ORDERID foreign key (ORDERID) references Orders(ID) on delete cascade,
    CONSTRAINT FK_GOODSTOORDER_GOODSID foreign key (GOODSID) references Goods(ID) on delete cascade
);

CREATE TABLE Orders(
    ID RAW(32) DEFAULT SYS_GUID(),
    ORDERNAME NVARCHAR2(100) unique,
    CUSTOMERPROFILEID RAW(32) DEFAULT SYS_GUID() NOT NULL,
    EXCECUTORPROFILEID RAW(32) DEFAULT SYS_GUID() null,
    STATUS NVARCHAR2(12),
    USERLOCATIONID RAW(32) default SYS_GUID(),
    DELIVERYLOCATIONID RAW(32) default SYS_GUID() null,
    ORDERDATE DATE,
    DELIVERYDATE DATE,
    DeliveryType NVARCHAR2(10),
    Price NUMBER(5,2),
    CONSTRAINT CHECK_ORDERS_DeliveryType CHECK(DeliveryType like 'courier' OR DeliveryType like 'pickup'),
    CONSTRAINT PK_ORDERS_ID primary key(ID),
    CONSTRAINT FK_ORDERS_CUSTOMERPROFILEID foreign key (CUSTOMERPROFILEID) references UserProfile(ID) on delete cascade,
    CONSTRAINT FK_ORDERS_EXCECUTORPROFILEID foreign key (EXCECUTORPROFILEID) references UserProfile(ID) on delete set null,
    CONSTRAINT FK_ORDERS_USERLCATIONID foreign key (USERLOCATIONID) references POINTS(ID),
    CONSTRAINT FK_ORDERS_DELIVERYLOCATIONID foreign key (DELIVERYLOCATIONID) references POINTS(ID),
    CONSTRAINT CHECK_ORDERS_STATUS CHECK(STATUS like 'unprocessed' OR STATUS like 'processed' OR STATUS like 'executed')
                   );


CREATE TABLE History(
    ID RAW(32) DEFAULT SYS_GUID(),
    ORDERID RAW(32) DEFAULT SYS_GUID(),
    CONSTRAINT PK_HISTORY_ID primary key (ID),
    CONSTRAINT FK_HISTORY_ORDERID foreign key (ORDERID)
        references Orders(ID) on delete cascade );



DROP TABLE SHAPES;
CREATE TABLE SHAPES
(
    ID         RAW(32) DEFAULT SYS_GUID(),
    SHAPE_NAME NVARCHAR2(20),
    AREA SDO_GEOMETRY,
    CONSTRAINT PK_SHAPES_ID primary key (ID)
);

CREATE TABLE ROADS
(
    ID         RAW(32) DEFAULT SYS_GUID(),
    ROAD_NAME NVARCHAR2(20),
    ROAD SDO_GEOMETRY,
    CONSTRAINT PK_ROADS_ID primary key (ID)
);

--deleted tables
/*CREATE TABLE DeliveryPoints(
    ID RAW(32) DEFAULT SYS_GUID(),
    NAME NVARCHAR2(50) not null,
    LOCATION SDO_GEOMETRY,
    CONSTRAINT PK_DELIVERYPOINTS_ID primary key (ID)
);

CREATE TABLE UserPoints(
    ID RAW(32) DEFAULT SYS_GUID(),
    LOCATION SDO_GEOMETRY,
    USERPOINT_NAME nvarchar2(100) unique not null,
    CONSTRAINT PK_USERPOINTS_ID primary key (ID)
);*/





