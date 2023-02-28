![Title](./images/title.png)

## NBA TOPSHOT REVIEWS

### What's you favorite moment?

---

<br>

`The NBA Topshot Reviews` **DAPP** is built on flow chain using `NBA TopShot` APIs.In the Dapp Users can add reviews for a particular moment or view all reviews for a particular moment.

Whether you're a collector, an NBA fan, or NFT Trader, explore the Moments here and find out what the community thinks about them.

Users can see the price of Trending `Moments` in `USDC` and click on Buy button to buy on NBA Topshot marketplace.
<br>
<br>

---

### Landing Page

<br>

![Home Page](./images/home.png)

<br>

## Demo

Demo link : <a style="margin-bottom: 5px;" href="https://github.com/Novobloc/nba-topshot-reviews" target="_blank"> Deployed Link </a>

> NOTE: _The proxy server need to be cold started. If the data is not loaded first time, Refresh a few times_

Github : <a style="margin-bottom: 5px;" href="https://github.com/Novobloc/nba-topshot-reviews" target="_blank"> Repo Link </a>

Video : <a style="margin-bottom: 5px;" href="" target="_blank"> Youtube Link </a>

PPT: <a style="margin-bottom: 5px;" href="https://nba-topshot-reviews.netlify.app/project-ppt.pdf" target="_blank"> Document Link </a>

<br>

## Steps to Run the Project

<br>

1. Clone the repo

```
git clone https://github.com/Novobloc/nba-topshot-reviews
```

2. Install the dependencies.

```
 npm i
```

3. Start the app using command

```
npm start
```

4. run proxy server
   (This server used to fix the cors issue of NBA topshot GraphQl APIs when called from React)

```
 npm run dev
```

5. Open this link in browser http://localhost:3000

6. Hey, You just ran the code in your system, thats it. Now you can rate your favorite Topshot moment .

<br>
<br>

---

## Stack We Used

<br>

![alt text](images/stack.png)
<br>

1. Frontend: We used **React JS**, Tailwind CSS and 3js for UI.

2. Blockchain :
   1. Onflow SDK: We used **@onflow/fcl** SDK for social login and wallet.
   2. Cadence: We used **Cadence** language to write scripts and transactions in order to interact with Flow chain.
   3. GraphQL: We used **GraphQL** to query nba topshot and to retrieve data in real time.
   4. Chain: We used **Flow** blockchain testnet to store review data.
   5. Dapper Studios: We built our app using **NBA Topshot** from Dapper Studios.
   6. Deployment: We created a contract and deployed it on Flow Block Chain testnet from Flow CLI. (You can find the command we used below)

<br>
<br>

## Meet Our Team

<div style="display: flex; justify-content: space-between; align-items: center;">
   <p style="flex:1">Shiva Kumar: </p>
   <div style="flex:4; justify-content: space-between;">
      <a href="https://www.linkedin.com/in/shivamangina/" target="_blank">
      <img src=https://img.shields.io/badge/linkedin-%2300acee.svg?color=405DE6&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 5px;" />
      </a>
      <a href="https://twitter.com/shivakmangina" target="_blank">
      <img src=https://img.shields.io/badge/twitter-%2300acee.svg?color=1DA1F2&style=for-the-badge&logo=twitter&logoColor=white alt=twitter style="margin-bottom: 5px;" />
      </a>
      <a href="https://www.instagram.com/shiva_mangina" target="_blank">
      <img src=https://img.shields.io/badge/instagram-%ff5851db.svg?color=C13584&style=for-the-badge&logo=instagram&logoColor=white alt=instagram style="margin-bottom: 5px;" />
      </a>
      <a href="https://github.com/shivamangina" target="_blank">
      <img src=https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white alt=github style="margin-bottom: 5px;" />
      </a>
   </div>
</div>

<div style="display: flex; justify-content: space-between; align-items: center;">
   <p style="flex:1">Sandeep Kumar: </p>
   <div style="flex:4; justify-content: space-between;">
      <a href="https://www.linkedin.com/in/satyasandeep" target="_blank">
      <img src=https://img.shields.io/badge/linkedin-%2300acee.svg?color=405DE6&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 5px;" />
      </a>
      <a href="https://twitter.com/satyasandeep76" target="_blank">
      <img src=https://img.shields.io/badge/twitter-%2300acee.svg?color=1DA1F2&style=for-the-badge&logo=twitter&logoColor=white alt=twitter style="margin-bottom: 5px;" />
      </a>
      <a href="https://www.instagram.com/satyasandeep007" target="_blank">
      <img src=https://img.shields.io/badge/instagram-%ff5851db.svg?color=C13584&style=for-the-badge&logo=instagram&logoColor=white alt=instagram style="margin-bottom: 5px;" />
      </a>
      <a href="https://github.com/satyasandeep007" target="_blank">
      <img src=https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white alt=github style="margin-bottom: 5px;" />
      </a>
   </div>
</div>

<br />

## Flow Commands:

### Account

```
0xb880e7b2e2c0a70b
```

### Check status

```
flow status -n testnet
```

To deploy the contract, run the following commands:

```
flow project deploy --network=testnet
```

At the end of the deployment, you should see the following output:

```
ReviewContract -> 0xb880e7b2e2c0a70b (daf12b7c1f67897398ded3c0faf86cd980eb321f8bda27a163bf892970dbc9d7)
```

To run the scripts, run the following command:

```
flow scripts execute cadence/scripts/getAllReviews.cdc --network=testnet
```

To add a review, run the following command:

```

flow transactions send cadence/transactions/addReview.cdc 4 "One of the best moments" "Mon Feb 27 2023 00:57:57 GMT+0530 (India Standard Time)" "123" --network=testnet
```
