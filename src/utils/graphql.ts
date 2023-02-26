import { createClient } from "urql";
import axios from "axios";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import fetchToCurl from "fetch-to-curl";

const config = {
  GRAPH_PROTOCOL: {
    API_URL: "https://public-api.nbatopshot.com/graphql/"
  }
};

const API_URL = config.GRAPH_PROTOCOL.API_URL;

export const getUserTransactions = async () => {
  const query = `
  query allPlayers {
    data {
        name,
        id
    },
    size
}
  `;
  //   const client: any = createClient({
  //     url: API_URL,
  //     fetchOptions: () => {
  //       return {
  //         headers: {
  //           "User-Agent": "PostmanRuntime/7.31.1",
  //           "Access-Control-Allow-Origin": "no-cors",
  //           "Content-Type": "application/json"
  //         }
  //       };
  //     }
  //   });
  //   const response = await client.query(query).toPromise();
  //   console.log(response, "satya");

  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "PostmanRuntime/7.31.1");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "no-cors");
  myHeaders.append("referrer", "https://satyasandeep.in");

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(query),
    redirect: "follow"
  };

  // and/or a Headers object as you would to with fetch
  const sha = await fetchToCurl({
    url: API_URL,
    headers: myHeaders,
    body: JSON.stringify(query),
    method: "post"
  });

  console.log(sha, "sha");

  //   fetch(API_URL, requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result, "sandp"))
  //     .catch((error) => console.log("error", error));
  //   const clientB = new ApolloClient({
  //     uri: API_URL,
  //     cache: new InMemoryCache()
  //   });

  //   const p = await clientB.query({
  //     query: gql`
  //       query getMomentsWithHighestBurnedTopshotScore {
  //         UserBurnedMoment {
  //           id
  //           flowID
  //           flowSerialNumber
  //           subeditionID
  //           assetPathPrefix
  //           flowSeriesNumber
  //           tier
  //           flowName
  //           visualID
  //           playID
  //           headline
  //           circulationCount
  //           username
  //           profileImageURL
  //           score
  //         }
  //       }
  //     `
  //   });
  //   console.log(p, "0o");
};
