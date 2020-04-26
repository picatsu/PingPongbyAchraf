# PingPong Achraf

** Compte rendu projet Pong dans le cadre de l'ue Techno Log **

Ce repository expose 3 applications Js : 1 client Web en Angular, 2 api Nodejs.

# Video De Présentation disponible :

**[YOUTUBE VIDEO](https://youtu.be/rzPGfq2uELw)**

## Installation

```bash
# premiere installation dependency npm
./firstInstall.sh

# lancement des differents composants
./localLauncher.sh
```

## Usage: Standalone

Si vous desirez lancer le programme en local

```ts
http://localhost:4200/
```

Si vous desirez consulter la version déployée

```ts
 https://young-dawn-77831.herokuapp.com/#/dashboard
```

## Features Disponibles

<li>PONG BOT : Player vs Machine </li>
<li>PONG 1V1 : Player vs Player : on the same machine (keyboard vs mouse)
 </li>
<li>PONG ONLINE : Player vs Random player ONLINE
 </li>
<li>PONG 2V2 : Player vs 3 Random Players ONLINE
 </li>
 Extra: 
<li>Changement de la limite de jeu (Score End Game)
 </li>
<li>Pseudo joueur (navbar )
 </li>
<li>Pseudo joueur (navbar )
 </li>
<li>Changement couleur css
 </li>

## Configuration Options

Les modes 1v1 et 2v2 sont geré en standalone par des api node, puis recuperer par angular avec des `iframe`

Ces api sont deployer directement sur heroku, si vous voulez les lancer en local, veuillez remplacer `environement.ts` par :

```ts
export const environment = {
  production: false,
  nodeApiUrl: "http://localhost:3000/api/v1",
  node1v1: "http://localhost:3000/",
  node2v2: "http://localhost:4000/",
};
```

# Des captures d'écran :

<h3>Page d'acceuil : Dashboard</h3>

![Alt text](./images/dashboard.PNG?raw=true "On Start")

<h3>Vs Machine </h3>

![Alt text](./images/pongbot.PNG?raw=true "On Start")

<h3>Clavier vs Souris en local</h3>

![Alt text](./images/pon1v1local.PNG?raw=true "On Start")

<h3>1v1 Online Phase de preparation </h3>

![Alt text](./images/online1v1P1.PNG?raw=true "On Start")

<h3>1v1 Online jeu </h3>

![Alt text](./images/online1v1P2.PNG?raw=true "On Start")

<h3>2v2 Online </h3>

![Alt text](./images/2v2.PNG?raw=true "On Start")

<h3>Victoire ! Le jeu redemarre </h3>

![Alt text](./images/1v1victoire.PNG?raw=true "On Start")
