
// Get all players
{
   allPlayers {
       data {
           name,
           id
       },
       size
   }
}

// 2
{
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


//3

{
     getMintedMoment(momentId:"6fb96965-75b3-40a1-833f-cc45b98e7e08"){
         data {
              id,
  version,
  sortID,
  set {
      sortID
  },
 
  flowId,
  flowSerialNumber,
  price,
  forSale,
  listingOrderID,
  userListingID,
  owner {
      topshotScore
  },
  
  assetPathPrefix,
 
  createdAt,
  acquiredAt,
  destroyedAt,
  packListingID,
 tags {
     title
 },
 
  lastPurchasePrice,
  tier,
  lockExpiryAt,
  isLocked,
  parallelID,

         }
     }
}


// 4 get all titles
{ 
     getTitles {
         titles {
             id ,
             name,
             description,
             category {
                 id , 
                 name
             },
             collectorCount,
             createdAt

         }
     }
}
