--------------------------------------------------------------------------------------------------------------------------------------------------------------------

Daily Task Angular Contains FE Codebase & DailyTaskApplication contains BE codebase.

clone the repo open angular codebase using visual studio code. 

run npm install it will install all necessary packages.

start the application using command npm start the application will start on localhost:4200 port.

To start the backend application open the .sln file located in DailyTaskApplication folder on Visual Studio.

Open terminal and type - "Update-Database". 

if the above command throws any error delete Migrations folder then 

In terminal type - 

1. Add-Migration "DB Creation".
2. Update-Database


After using above commands the database will be created. start the BE application and do the work on angular FE application for CURD Operations.

Table name - Task

Table columns - 

Id - int,
Description - string,
Created - DateTime

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

