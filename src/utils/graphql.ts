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
