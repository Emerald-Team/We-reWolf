<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). -->

![](public/image.png)

## Tech Stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Axios](https://img.shields.io/badge/-Axios-671ddf?logo=axios&logoColor=black&style=for-the-badge)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Welcome to We'reWolf!

An age-old rivalry, come to life! Join your friends in a spooky yet elegant struggle to find the furry menaces ravaging your village. Be careful though -- you may be shocked to find your friends are actually the culprits!


## Getting Started
### Installation


Once you've cloned this repo, navigate into the root directory, and install all of the necessary dependencies:


```
npm install

```

Once all node module dependencies have been installed, initialize a server and compiler to open the app:

```
npm run build
npm run start

```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About The Game

### Objective:
  - **For the Villagers, Doctor, and Seer:** Identify and vote out the Werewolves to save the village.

  - **For the Werewolves:** Eliminate all Villagers and other opposing roles.
### Roles:
  - **Werewolves:** Typically, there are 2 or more players who are designated as Werewolves. They work together to eliminate other players during the game. The Werewolves know each others identity and can communicate secretly to plan their strategy.
  - **Villagers:** The majority of players are Villagers. They do not have any special abilities other than trying to identify and vote out the Werewolves during the game.


  <!-- - **Doctor:** The Doctor is a special role on the side of the Villagers. The Doctor has the ability to protect one player each night from being eliminated by the Werewolves. The Doctors goal is to save as many Villagers as possible.
  - **Seer:** The Seer is another special role on the side of the Villagers. The Seer has the ability to investigate one players identity each night to determine if they are a Villager or a Werewolf. The Seers goal is to gather information and use it to help the Villagers identify the Werewolves. -->

### GamePlay:
  1. The game is played in rounds, with each round consisting of two phases: Day and Night.
  2. During the Day phase, all players, including the Villagers, Doctor, and Seer, openly discuss and vote on who they think is a Werewolf. Players can use their observations, deductions, and any special abilities they may have to make their case.

  3. At the end of the Day phase, the player with the most votes against them is dead and eliminated from the game. If there is a tie, no one is dead.
  4. During the Night phase, the Werewolves secretly choose a player to eliminate from the game. The Doctor can choose a player to protect, and the Seer can investigate a players identity.

  5. The next Day phase begins, and the cycle continues until either all Werewolves are eliminated, or the Werewolves outnumber the Villagers.

  6. The game continues until one of the win conditions is met: either the Werewolves are all eliminated, or the Werewolves outnumber the Villagers.



## Features
  ### Login
  Login/Signup forms provide an authentication layer to the game, with successful credentials leading to serverless routing to the game lobby.
  ![](public/loginGif.gif)
  ### Game Lobby

  ![](public/lobbytogame.gif)

  ### Game Page
  Once in the main room, the day and night cycle will run based off of a timer, with users voting at different moments based on their provided roles. Group deliberation is conducted through the chat window as shown to the right.

  ![](public/gameroomGif.gif)

  ### Voting Off Players
  <div>After villagers have casted their votes, players with the majority of votes cast will be removed from the game, and unable to participate in future rounds.
  <img src="public/tombstonepic.png"></div>

  ### - Questions and feedback is most welcome, and should be directed to the authors listed below. Thank you for visiting!



## Authors

  1. [Ben Tracy](https://www.linkedin.com/in/bentracydotcom/) || [GitHub](https://github.com/popeshaq)

  2. [Jae Hoon Lee](https://www.linkedin.com/in/jae-hoon-lee/) || [GitHub](https://github.com/jl924)

  3. [James Carrington](https://www.linkedin.com/in/james-carrington-jdc/) || [GitHub](https://github.com/Chordata88)


  4. [Justen Lane](https://www.linkedin.com/in/justenlane/) || [GitHub](https://github.com/Jlane20)

  5. [William Miller](https://www.linkedin.com/in/willcmiller/) || [GitHub](https://github.com/millerw4)

  6. [Zack Freeman](https://www.linkedin.com/in/zackfreeman/) || [GitHub](https://github.com/zfreeman341)