# Player API

## Contents
* [Problem Statement](#problem-statement)
* [Assumptions](#assumptions)
* [API](#api)
  * [HTTP Endpoints](#http-endpoints)
* [Development](#development)
* [Provisioning and Deployment](#provisioning-and-deployment)
* [Tests](#tests)
* [Database Schema](#database-schema)
* [TODO](#todo)



## Problem Statement
Design a service that allows a developer to create, update, and modify user records. User records must include at least the following information: 

* Personal Details: Personal details would consist of information that would be tied directly to a user. This should take into account information such as a player’s username and email.
* Game Statistics: This would be non-personal information about a player, based on their gameplay. Examples would include kills, deaths, wins, losses, etc. 
* Achievements: Awards that a player earns after meeting a pre-determined criteria created by the game developer. e.g. win 5 matches 
* Matches: Gameplay sessions that occur between 2 or more players. Examples of a * Match could be anything from two players competing a full game of chess, or 16 players competing in a team-based shooter. 
 
Your response should include: 
* A document detailing your interpretation of the prompt and assumptions that you have made 
* (Pseudo) Code detailing the API you would expose and data models you would use. Any technology(s) can be used here. 
* Partial implementations (CLI, REST API, test suites, etc). A major part of our assessment is a review of your actual written code, so it is important to show us a good portion of your application implemented.
* Any other information work you'd like to share. 
 
Previous submissions have additionally included (all optional): 
* Database Schemas 
* Recommended Tech Stack 
* Possible deployment architecture 

## Assumptions
* Game developers are responsible for updating player achievements. Although game stats can be tracked in Player API, a player must be given an achievement via a request from the game developer. It will NOT be triggered by a minimum stat count. It will not correlate to game stats at all.
* The same stat can be attributed to multiple players per match (e.g. multiple winners in a single match)
* Game developers can come up with their own kinds of stats that are relevant to their own games


## API
Player API is REST API. It can accept a variety of requests from game developers to update player information relating to their games.

Player API accepts HTTP requests, with request parameters in the request body as JSON, and returns JSON in the response. Below are the API endpoints and the respective parameters they accept. Endpoints that have yet to be implemented are starred (***).

An example request looks like:
```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d '{"screen_name": "Gamer600", "email":"gamer600@games.com", "full_name": "Johnson Doe"}' http://localhost:3000/players 
```

### HTTP Endpoints
---
### POST /players
Creates a player

| Parameter     | Type          | Description               | Optional |
| ------------- |---------------| -------------------------:|----------|
| screen_name   | string        | player's online pseudonym | no       |
| email         | string        | player's email            | no
| full_name     | string        | player's name             | no


### PUT /players/:id
Updates certain attributes of a player

| Parameter     | Type          | Description               | Optional |
| ------------- |---------------| -------------------------:|----------|
| email         | string        | player's email            | yes      |
| full_name     | string        | player's name             | yes      |

### POST /matches
Creates a match

| Parameter     | Type          | Description               | Optional |
| ------------- |---------------| -------------------------:|----------|
| game          | integer or string| id or name of game that match is associated with| no

### PUT /matches/:id
Updates certain attributes of a match

| Parameter     | Type          | Description               | Optional |
| ------------- |---------------| -------------------------:|----------|
| started       | string        |  match start time -- parseable datetime string (e.g.  '2015-03-25T12:00:00Z' or '5/13/1991') | yes
| ended         | string        | match end time -- parseable datetime string  | yes


### PUT /matches/:id/players
Updates the players that took part in a match.

| Parameter     | Type          | Description               | Optional |
| ------------- |---------------| -------------------------:|----------|
| player_ids    | array (of ids)   | list of players who participated in a match | yes (if not specified, participants are updated to none)

### POST /achievements ***
Creates an achievement that is associated with a game

| Parameter     | Type          | Description               | Optional |
| ------------- |---------------| -------------------------:|----------|
| description   | string        | A description of the achievement a player can receive  | no |
| game          | integer or string| id or name of the game that achievement is associated with| no |

### PUT /achievements/:id ***
Updates an achievement that is associated with a game

| Parameter     | Type          | Description               | Optional |
| ------------- |---------------| -------------------------:|----------|
| description   | string        | A description of the achievement a player can receive  | yes |
| game          | integer or string| id or name of the game that achievement is associated with| yes |

### POST /achievements/:id/players/:id ***
Gives the player an achievement, if they have already received that achievement, it increases their count by one. This request only needs an achievement id and a player id to specified in the url.

### POST /stat_types ***
Add a new stat type that can be tallied. Game developers can add new ones because their could be statistics specific to their game.

| Parameter     | Type          | Description               | Optional |
| ------------- |---------------| -------------------------:|----------|
| description   | string        | A description of the new stat  (e.g. 'Win', 'Loss').  | no

### POST /stats ***
Attribute game stats to players and matches. This API request is made after a match when all the stats have been tallied.

| Parameter     | Type          | Description               | Optional |
| ------------- |---------------| -------------------------:|----------|
| stat_type     | integer or string | id or name of the statistic type | no
| match_id      | integer       | id of the match the stat was achieved during| no
| player_id     | integer       | id of the player the stat was achieved by| no
| quantity      | integer       | the count of the stat (e.g. 15 kills in the match). 0 if not specified | yes

## Development
Player API is a Node.js running application interface with a MySQL database backend. It was designed with the Express web application framework and has been designed to run on a Linux Operating System. To date, it has successfully been run and tested on a Debian-based OS (Linux Mint).

### Requirements
To develop locally, you will need to install a few dependencies:

1. Install Node.js
```bash
#  Install NVM
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash

# Install Node 6.11 with npm
nvm install 6.11
```
2. Install Yarn
```bash
npm install -g yarn@1.0.2
```

3. Setup MySQL
```bash
sudo apt-get install mysql-server
```

Once you have installed MySQL, create the player_api database and run the SQL scripts found in `ansible/files/database/` to create and populate tables.

4. Install Ansible
```bash
sudo pip install ansible==2.2.0.0
```
Ansible is a provisioning and deployment tool that can be used to codify configurations need to run applications.

5. Setup configuration file
You will also need to set up your configuration file that lives in `config/application.json` (this will depend on the MySQL instance you are connecting too)
```json
{
  "database": {
    "host": "localhost",
    "port": 3306,
    "database": "player_api",
    "username": "player_api",
    "password": "player_api"
  }
}
```

Once the above has been set up, you can run the application with:
```bash
yarn install

npm start
```
### Tools
I recommend using [MySQL Workbench](https://www.mysql.com/products/workbench/) to view database changes and [Postman](https://www.getpostman.com/) to test out API requests.


## Provisioning and Deployment
To provision a dev environment, you can use the Vagrantfile provided. Note, vagrant (and virtualbox) may be needed to run the application. Simply run:
```bash
cd ansible && ansible-galaxy install -r requirements.yml

cd .. && vagrant up
```
The vagrant instance runs on an Ubuntu image. You can use the same ansible scripts used to provision the dev environment to deploy a staging or production environment. Simply add a new inventory file in the `ansible/inventories` directory and add the new environment-specific variables in the `ansible/inventories/group_vars` directory.

I also plan to create a deployment script (see TODO) that can be incorporated into the Vagrantfile.

## Tests
To run the unit tests.
```bash
npm test
```
The unit tests do not require connectivity to a test database, as all database interactions are stubbed. However, you must have `config/application.json` present to run the tests.
Going forward, these tests can be integrated into CI pipelines to ensure that every deployed application passes all tests.

## Database Schema
![GitHub Logo](/schema.png)

## TODO
* Design and implement 'read' routes. The problem only stated to make a service that would 'create, update and modify' player data, so that took priority. Ideally, game developers would want to look up player data for their own use.
* Implement the remaining HTTP Endpoints:
  * POST /achievements
  * PUT /achievements/:id
  * POST /achievements/:id/players/:id
  * POST /stat_types
  * POST /stats
* Implement token based authentication, so only game developers have access to the API (this is especially important since the API could be exposed publically)
* Implement application deploy script. An example implementation of this could involve:
  * Bundling the application with it dependencies into a tarball
  * Copying the tarball to the target server(s)
  * Unpacking and starting the application process
  * Setting up a reverse-proxy that can serve the application process to an outgoing port like 80 or 443)
* Implement Continuous Integration which runs unit tests and deploys application changes
* Create Unit Tests for the API routes
* Refactor/DRY up test code
* Setup logging (both incoming requests and errors)
* If stat aggregation was a desired feature, I would recommend that the API would stream messages (via a platform like Kafka) of player-stat data to a search index (like ElasticSearch). This would allow more quickly obtained data views