## NBA Chronos


info:
```
Public Key               52e91c811e8f0ac9b35d9244366420bdee1196df2c30c60945b9f51be6e7c294679dadc3ea0dd5de00bb3eb7bfc2b4fef35ecea72d2b4f5a6bd25b6f7227be40 


account 0xb880e7b2e2c0a70b
```

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

To run the tests, run the following command:

```
flow scripts execute cadence/scripts/getAllReviews.cdc --network=testnet   
```

To add a review, run the following command:

```

flow transactions send cadence/transactions/addReview.cdc 4 "One of the best moments" "Mon Feb 27 2023 00:57:57 GMT+0530 (India Standard Time)" "123" --network=testnet 
```