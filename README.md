

## Introduction

Requirements
Create an implementation of the game Battleship. The game should be playable with at least one person. For example, human vs computer or human vs human.
The game consists of:
* 2 Players
* Each player has a grid on which to place ships
* The game begins once both players have placed their ships
* The players take turns choosing a position on the opponent’s grid to attack
The result of an attack must be one of:
---------------------------------------------
“Hit” if the opponent has a ship covering the position
“Miss” if there is no ship covering the position
“Already Taken” if the position has previously been attacked “Sunk” if all the positions a ship covers have been hit
“Win” if all the ships on the opponent's grid have been sunk


## Installation
```shell
npm install
npm run dev
```
## Testing
```shell
npm run test
```
## deploy
```shell
npm run build
npm run start
```