import axios from "axios";

export const getMomentsWithHighestBurnedTopshotScore = async () => {
  const query = `{
    getMomentsWithHighestBurnedTopshotScore {
        moments {
            id,
            flowID,
            flowSerialNumber,
            subeditionID,
            assetPathPrefix,
            flowSeriesNumber,
            tier,
            flowName,
            visualID,
            playID,
            headline,
            circulationCount,
            username,
            profileImageURL,
            score,
          
        }
    }
  }
  `;
  const res = await axios.post("http://localhost:8080/test", { query });
  return res.data.data.getMomentsWithHighestBurnedTopshotScore.moments;
};

export const getAllPlayers = async () => {
  //   {
  //     "name": "Aari McDonald",
  //     "id": "1630462"
  // }
  const query = `{
      allPlayers {
          data {
              name,
              id
          },
          size
      }
  }
  `;
  const res = await axios.post("http://localhost:8080/test", { query });
  return res.data.data.allPlayers.data;
};

export const dummyReq = async () => {
  //   {
  //     "name": "Aari McDonald",
  //     "id": "1630462"
  // }
  const query = `{
    getSpecialNFTs {
          data {
              name,
              id
          },
          size
      }
  }
  `;
  const res = await axios.post("http://localhost:8080/test", { query, variables: {} });
  return res.data.data;
};

export const searchMarketPlaceByPlayerId = async (setId: string, playId: string, limit: number) => {
  const query = `query searchMarketplaceTransactions ($input: SearchMarketplaceTransactionsInput!) {
    searchMarketplaceTransactions(input: $input) {
      data {
        searchSummary {
          pagination {
            rightCursor
            __typename
          }
          data {
            ... on MarketplaceTransactions {
              size
              data {
                ... on MarketplaceTransaction {
                  id
                  sortID
                  seller {
                    ...UserFragment
                    __typename
                  }
                  buyer {
                    ...UserFragment
                    __typename
                  }
                  price
                  moment {
                    tier
                    assetPathPrefix
                    flowSerialNumber
                    id
                    play {
                      id
                      league
                      headline
                      description
                      headlineSource
                      assets {
                        videos {
                            type
                            url
                            videoLength
                        }
                        videoLengthInMilliseconds
                      }
                      stats {
                        birthdate
                        playerName
                        firstName
                        lastName
                        dateOfMoment
                        playCategory
                        teamAtMomentNbaId
                        teamAtMoment
                        nbaSeason
                        awayTeamNbaId
                        awayTeamScore
                        homeTeamNbaId
                        homeTeamScore
                        __typename
                      }
                      statsPlayerGameScores {
                        points
                        assists
                        rebounds
                        __typename
                      }
                      tags {
                        ...TagsFragment
                        __typename
                      }
                      __typename
                    }
                    set {
                      id
                      sortID
                      version
                      flowId
                      flowName
                      flowSeriesNumber
                      flowLocked
                      setVisualId
                      assetPath
                      assets {
                          images {
                              type
                              url
                          }
                      }
                    }
                    setPlay {
                      ID
                      flowRetired
                      tags {
                        ...TagsFragment
                        __typename
                      }
                      circulations {
                        ...CirculationsFragment
                        __typename
                      }
                      __typename
                    }
                    parallelID
                    __typename
                  }
                  txHash
                  updatedAt
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
}


fragment TagsFragment on Tag {
  id
  title
  visible
  level
  __typename
}

fragment CirculationsFragment on SetPlayCirculations {
  burned
  circulationCount
  forSaleByCollectors
  hiddenInPacks
  ownedByCollectors
  unavailableForPurchase
  locked
  __typename
}

  fragment UserFragment on UserPublicInfo {
    dapperID
    username
    profileImageUrl
    twitterHandle
    createdAt
    flowAddress
    favoriteTeamID
    ownedSpecialNFTTypes
    city
    country
    __typename
  }`;
  const variables = {
    input: {
      sortBy: "PRICE_DESC",
      // filters: { byEditions: [{ setID: "208ae30a-a4fe-42d4-9e51-e6fd1ad2a7a9", playID: "41b16a7d-d172-46bb-915a-3898af25f10e" }], byParallels: [0] },
      filters: { byEditions: [{ setID: setId, playID: playId }], byParallels: [0] },
      searchInput: { pagination: { cursor: "", direction: "RIGHT", limit } }
    }
  };
  const res = await axios.post("http://localhost:8080/test", { query, variables });
  return res.data.data.searchMarketplaceTransactions.data.searchSummary.data.data;
};

export const searchEditions = async () => {
  const query = `query SearchEditionListings($bySets: [ID] = [], $byLeagues: [League] = [], $byMomentTiers: [MomentTier] = [], $byPlayers: [ID] = [], $byTeams: [ID] = [], $byPrimaryPlayerPosition: [PlayerPosition] = [], $byPlayCategory: [ID] = [], $byPrice: PriceRangeFilterInput = {min: null, max: null}, $bySerialNumber: IntegerRangeFilterInput = {min: null, max: null}, $byGameDate: DateRangeFilterInput = {start: null, end: null}, $byCreatedAt: DateRangeFilterInput = {start: null, end: null}, $bySetVisuals: [VisualIdType] = [], $byParallelIDs: [Int] = [], $byPlayTagIDs: [ID] = [], $byPlayIDs: [ID] = [], $bySetPlayTagIDs: [ID] = [], $bySeries: [ID] = [], $byActiveChallenge: [ID] = [], $byEditions: [EditionsFilterInput] = [], $orderBy: EditionListingSortType = UPDATED_AT_DESC, $searchInput: BaseSearchInput = {pagination: {direction: RIGHT, limit: 12, cursor: ""}}, $userID: ID) {
    searchEditionListings(input: {filters: {bySets: $bySets, byLeagues: $byLeagues, byMomentTiers: $byMomentTiers, byPlayers: $byPlayers, byTeams: $byTeams, byPrimaryPlayerPosition: $byPrimaryPlayerPosition, byPlayCategory: $byPlayCategory, byPrice: $byPrice, bySerialNumber: $bySerialNumber, byGameDate: $byGameDate, byCreatedAt: $byCreatedAt, bySetVisuals: $bySetVisuals, byParallelIDs: $byParallelIDs, byPlayTagIDs: $byPlayTagIDs, byPlayIDs: $byPlayIDs, bySetPlayTagIDs: $bySetPlayTagIDs, bySeries: $bySeries, byActiveChallenge: $byActiveChallenge, byEditions: $byEditions}, sortBy: $orderBy, searchInput: $searchInput, userID: $userID}) {
      data {
        filters {
          bySets
          byLeagues
          byMomentTiers
          byPlayers
          byTeams
          byPrimaryPlayerPosition
          byPlayCategory
          byPrice {
            min
            max
            __typename
          }
          bySerialNumber {
            min
            max
            __typename
          }
          byGameDate {
            start
            end
            __typename
          }
          byCreatedAt {
            start
            end
            __typename
          }
          bySetVisuals
          byPlayIDs
          byPlayTagIDs
          bySetPlayTagIDs
          bySeries
          byActiveChallenge
          byEditions {
            setID
            playID
            __typename
          }
          __typename
        }
        searchSummary {
          pagination {
            leftCursor
            rightCursor
            __typename
          }
          data {
            ... on EditionListings {
              size
              data {
                ... on EditionListing {
                  ...EditionFragment
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
  
  fragment EditionFragment on EditionListing {
    id
    version
    assetPathPrefix
    tier
    set {
      id
      flowId
      flowName
      flowSeriesNumber
      flowLocked
      setVisualId
      assetPath
      assets {
          images {
              type
              url
          }
      }
      __typename
    }
    play {
      id
      description
      shortDescription
      flowID
      headline
      headlineSource
      assets {
        videos {
            type
            url
            videoLength
        }
        videoLengthInMilliseconds
      }
      stats {
        birthdate
        playerName
        firstName
        lastName
        dateOfMoment
        playCategory
        teamAtMomentNbaId
        teamAtMoment
        nbaSeason
        awayTeamNbaId
        awayTeamScore
        homeTeamNbaId
        homeTeamScore
        __typename
      }
      statsPlayerGameScores {
        points
        assists
        rebounds
        __typename
      }
      tags {
        ...TagsFragment
        __typename
      }
      league
      __typename
    }
    parallelSetPlay {
      iconAssetURL
      parallelID
      playID
      setID
      circulations {
        ...CirculationsFragment
        __typename
      }
      __typename
    }
    setPlay {
      ID
      flowRetired
      tags {
        ...TagsFragment
        __typename
      }
      circulations {
        ...CirculationsFragment
        __typename
      }
      __typename
    }
    priceRange {
      min
      max
      __typename
    }
    uniqueSellerCount
    editionListingCount
    userOwnedEditionsCount
    averageSaleData {
      averagePrice
      numDays
      numSales
      __typename
    }
    parallelID
    parallels {
      set {
        id
        __typename
      }
      play {
        id
        __typename
      }
      parallelID
      __typename
    }
    __typename
  }
  
  fragment TagsFragment on Tag {
    id
    title
    visible
    level
    __typename
  }
  
  fragment CirculationsFragment on SetPlayCirculations {
    burned
    circulationCount
    forSaleByCollectors
    hiddenInPacks
    ownedByCollectors
    unavailableForPurchase
    locked
    __typename
  }`;
  const variables = {
    bySets: [],
    byLeagues: [],
    byMomentTiers: [],
    byPlayers: [],
    byTeams: [],
    byPrimaryPlayerPosition: [],
    byPlayCategory: [],
    byPrice: { min: null, max: null },
    bySerialNumber: { min: null, max: null },
    byGameDate: { start: null, end: null },
    byCreatedAt: { start: null, end: null },
    bySetVisuals: [],
    byParallelIDs: [],
    byPlayTagIDs: [],
    byPlayIDs: [
      "8ec6d2f1-458e-4443-8141-b95e8208ab97",
      "f869f767-3cce-49e4-a323-68d675fe7a6b",
      "ccff85c0-b991-4363-aa45-7a196695863d",
      "920f6326-6b70-4bef-ae67-6fccf26329d9",
      "ae991194-d858-4624-92a7-9b0d621717c8",
      "367a86af-0e5b-4634-a0e1-17902dbd7000",
      "bb519451-4ff8-437b-a8aa-022eb883187a",
      "1eb8990e-ffea-4f08-8ff1-23ae0b62d931",
      "2c809890-a5be-418b-a84c-c8f101c4f75b",
      "f869f767-3cce-49e4-a323-68d675fe7a6b",
      // "90b87282-a031-496f-8ff4-f140d42b2a76",
      "33edf9df-357c-453a-a6e1-7c1549006bfb",
      "d72c6f8e-3720-422b-a52b-f772cc64f3a6",
      "b3dc9561-acbc-4869-8346-5a7b616edfc2"
    ],
    bySetPlayTagIDs: [],
    bySeries: [],
    byActiveChallenge: [],
    byEditions: [],
    orderBy: "UPDATED_AT_DESC",
    searchInput: { pagination: { direction: "RIGHT", cursor: "", limit: 12 } }
  };
  const res = await axios.post("http://localhost:8080/test", { query, variables });
  return res.data.data.searchEditionListings.data.searchSummary.data.data;
};
