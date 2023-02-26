export const a = 5;

// const getTopShotMomentsByPlayerQuery = useCallback(async () => {
//     const result = await fcl.query({
//       cadence: `
//       import TopShot from 0xTOPSHOTADDRESS

//       pub fun main(account: Address): [UInt64] {

//           let acct = getAccount(account)

//           let collectionRef = acct.getCapability(/public/MomentCollection)
//                                   .borrow<&{TopShot.MomentCollectionPublic}>()!

//           return collectionRef.getIDs()
//       }
//       `,
//       args: (arg: any, t: any) => [
//         arg("0x24be2543dbe3ccbc", t.Address) // addr: Address
//       ]
//     });
//     console.log(result); // 13
//   }, []);

//   const getSubEditionsQuery = useCallback(async () => {
//     const result = await fcl.query({
//       cadence: `
//       import TopShot from 0xTOPSHOTADDRESS

// pub fun main(): [TopShot.Subedition] {

//     return TopShot.getAllSubeditions()
// }
//       `,
//       args: (arg: any, t: any) => [
//         // arg("0x24be2543dbe3ccbc", t.Address) // addr: Address
//       ]
//     });
//     console.log(result); // 13
//   }, []);

//   const getPlayMetaDataQuery = useCallback(async () => {
//     //   {
//     //     "PrimaryPosition": "PF",
//     //     "AwayTeamScore": "170",
//     //     "PlayType": "Rim",
//     //     "DraftYear": "2019",
//     //     "LastName": "Williamson",
//     //     "DateOfMoment": "2021-03-08 01:00:00 +0000 UTC",
//     //     "DraftTeam": "New Orleans Pelicans",
//     //     "Weight": "284",
//     //     "DraftRound": "1",
//     //     "DraftSelection": "1",
//     //     "Height": "79",
//     //     "Birthplace": "Salisbury, NC, USA",
//     //     "PlayCategory": "Dunk",
//     //     "TeamAtMomentNBAID": "1610616833",
//     //     "Birthdate": "2000-07-06",
//     //     "HomeTeamName": "Team Durant East",
//     //     "AwayTeamName": "Team LeBron West",
//     //     "FirstName": "Zion",
//     //     "JerseyNumber": "1",
//     //     "TeamAtMoment": "Team Durant East",
//     //     "TotalYearsExperience": "1",
//     //     "NbaSeason": "2020-21",
//     //     "HomeTeamScore": "150",
//     //     "FullName": "Zion Williamson",
//     //     "PlayerPosition": "C"
//     // }
//     const result = await fcl.query({
//       cadence: `
//       import TopShot from 0xTOPSHOTADDRESS

//       pub fun main(playID: UInt32): {String:String} {

//           let metadata = TopShot.getPlayMetaData(playID: playID) ?? panic("Play doesn't exist")

//           return metadata
//       }
//       `,
//       args: (arg: any, t: any) => [
//         arg(363, t.UInt32) // addr: Address
//       ]
//     });
//     console.log(result); // 13
//   }, []);

//   const getSetDataQuery = useCallback(async () => {
//     // name: "2021 All-Star Game"
//     // numberMintedPerPlay: {363: "178",364: "0",365: "0"}
//     const result = await fcl.query({
//       cadence: `
//       import TopShot from 0xTOPSHOTADDRESS

// pub fun main(setID: UInt32): TopShot.QuerySetData {

//     let data = TopShot.getSetData(setID: setID)
//         ?? panic("Could not get data for the specified set ID")

//     return data
// }
//       `,
//       args: (arg: any, t: any) => [
//         arg(32, t.UInt32) // addr: Address
//       ]
//     });
//     console.log(result); // 13
//   }, []);

//   const getNumberOfMomentsQuery = useCallback(async () => {
//     //178
//     const result = await fcl.query({
//       cadence: `
//       import TopShot from 0xTOPSHOTADDRESS

// pub fun main(setID: UInt32, playID: UInt32): UInt32 {

//     let numMoments = TopShot.getNumMomentsInEdition(setID: setID, playID: playID)
//         ?? panic("Could not find the specified edition")

//     return numMoments
// }
//       `,
//       args: (arg: any, t: any) => [
//         arg(32, t.UInt32), // addr: Address
//         arg(363, t.UInt32) // addr: Address
//       ]
//     });
//     console.log(result); // 13
//   }, []);

//   const getPlaysInSetQuery = useCallback(async () => {
//     //  363,364,365
//     const result = await fcl.query({
//       cadence: `
//       import TopShot from 0xTOPSHOTADDRESS

// pub fun main(setID: UInt32): [UInt32] {

//     let plays = TopShot.getPlaysInSet(setID: setID)!

//     return plays
// }
//       `,
//       args: (arg: any, t: any) => [
//         arg(32, t.UInt32) // addr: Address
//       ]
//     });
//     console.log(result); // 13
//   }, []);

//   const executeQuery = useCallback(async () => {
//     const result = await fcl.query({
//       cadence: `
//         pub fun main(a: Int, b: Int, addr: Address): Int {
//           log(addr)
//           return a + b
//         }
//       `,
//       args: (arg: any, t: any) => [
//         arg(7, t.Int), // a: Int
//         arg(6, t.Int), // b: Int
//         arg("0xba1132bc08f82fe2", t.Address) // addr: Address
//       ]
//     });
//     console.log(result); // 13
//   }, []);

//   const getAccountBalance = async (address: string) => {
//     const account = await fcl.send([fcl.getAccount(address)]).then(fcl.decode);
//     console.log(account, "account");
//     return account;
//   };
