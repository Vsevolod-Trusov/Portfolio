CREATE DATABASE ServiceBase

CREATE TABLE UsersLogin(
Id uniqueidentifier constraint ID_UsersLogin_PK  primary key,
UserLogin nvarchar(100),
PasswordHash nvarchar(200)
)

CREATE TABLE ServiceType(
Id uniqueidentifier constraint ID_ServiceType_PK primary key,
Title nvarchar(100),
Category nvarchar(100),
Price numeric(10,3)
)

CREATE TABLE Images(
ImageId uniqueidentifier constraint ImageId_Images_PK primary key,
ImagePath nvarchar(300)
)



CREATE TABLE UsersProfile(
Id uniqueidentifier constraint ID_UserProfile_PK primary key,
Avatar uniqueidentifier constraint Avatar_UsersProfile_FK foreign key references Images(ImageId),
Email varchar(100),
UserRole nvarchar(5) constraint UserRole_UsersLogin_Check check(UserRole in ('user','admin', 'staff')),
UserLoginId uniqueidentifier constraint UserLoginId_UserProfile_FK foreign key references UsersLogin(Id),
)

CREATE TABLE UserService(
UserProfileId uniqueidentifier constraint UserProfileId_UserService_FK foreign key references UsersProfile(Id),
ServiceTypeId uniqueidentifier constraint ServiceTypeId_UsersService_FK foreign key references ServiceType(Id),
constraint UserProfileIdAndServiceTypeId_UsersService_PK primary key(UserProfileId, ServiceTypeId)
)

CREATE TABLE ServiceOrder(
Id uniqueidentifier constraint ID_ServiceOrder_PK primary key,
CustomerProfileId uniqueidentifier constraint CustomerProfileId_ServiceOrder_FK foreign key references UsersProfile(Id) not null,
ExecutorProfileId uniqueidentifier constraint ExecutorProfileId_ServiceOrder_FK foreign key references UsersProfile(Id) null,
DataOrder datetime,
ServiceTypeId uniqueidentifier constraint ServiceTypeId_ServiceOrder_FK foreign key references ServiceType(Id),
Desctiption text,
Price smallmoney,
ExecutionStatus nvarchar(20),
Deadline datetime
)

CREATE TABLE Reviews(
Id uniqueidentifier constraint ID_Reviews_PK primary key,
UsersProfileId uniqueidentifier constraint UsersProfileId_Reviews_FK foreign key references UsersProfile(Id),
Photo uniqueidentifier constraint Photo_Reviews_FK foreign key references Images(ImageId),
Content text,
Estimation int constraint Estimation_Reviews_Check check(Estimation >= 0 AND Estimation <= 10)
)
DELETE  FROM  Images
DELETE FROM UsersProfile
DELETE FROM UsersLogin

--Insert ServiceOrder values(Id, CustomerProfileId, DataOrder, ServiceTypeId, Desctiption, Price, ExecutionStatus, Deadline)
Delete from Reviews WHERE id like 'F525C532-CEBB-44E5-9710-F010FEA82202'

DELETE From Reviews

DELETE FROM UsersProfile where Email like '123@mail.ru'
DELETE FROM UsersLogin where UsersLogin.UserLogin like 'esvtoeyicxkklvfgmjfncutnuarcufbudhpntrkuhjbmjmqeadebthbtbwrfpneeevhzksdsuppptwbhhbkuqsljsepazsnfstae'