# ReadMe

## Brief Overview

This is a web application for MineSweeper. It has single player & multiplayer mode. 

The purpose of this project is to get experience in web application architecture and process (UI/UX design, database, server, client, sockets), as well as experiment on Angular 2 as UI framework.

### General

Gameplay feature 3 difficulties. When user finishes playing the game, he/she can submit their highscore if database and server is setup. Global and Room chat is also only available if server is setup.

### Multiplayer

In multiplayer, you have to create a room, and wait for another user to join the room in order to start the game. The first player to finish the game wins.

### Highscore 

Highscore chart only works if server and database is setup.

## How to run:

### Start Client:
1. open client/MineSweepers folder via terminal
2. npm install --save
3. npm start

### Start Server:
4. open server folder via terminal
5. npm install --save
6. npm start

### Setup Database (If database not already set up - without database, single player will still work)
7. Set up mySQL server (Recommended to use MySQLWorkbench)
8. Change settings on server/db/db.js, specifically the line: mysql://root:asdf123@localhost/sys to match your own configuration.
9. Navigate to server/db 
10. run node init_db.js

## Basic Components (Client):
Angular 2: Front-end UI Framework (used Angular cli to create seed project)

Font-Awesome: CSS library

BootStrap 4: CSS library

## Basic Components (Server):

nodeJS: Server

Express: framework of nodeJS to handle API routes

SQL Server: Database

Sequelize: SQL Server ORM


## 
 
Last Updated: 12/12/2017 Alex Wong