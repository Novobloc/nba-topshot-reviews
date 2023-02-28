import React, { useEffect, useState } from "react";
import { searchEditions, getExchangeRates } from "../../utils/graphql";
import { useWeb3Context } from "../../context/Onflow";
import { formatReviews } from "../../utils/functions";
import _ from "lodash";
import Card from "./Card";

export default function List() {
  const { executeScript } = useWeb3Context();
  const [market, setMarket]: any = useState(null);
  const [exchangeRates, setExchangeRates]: any = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (market) return;
        else {
          const exchangeData = await getExchangeRates();
          if (exchangeData) {
            setExchangeRates(exchangeData);
          }
          const data = await fetchMarketData();
          console.log(data, "data");
          if (data) {
            setMarket(data);
          }
        }
      } catch (error) {
        console.log(error, "error");
      }
    })();
  }, []);

  const fetchMarketData = async () => {
    const data = await searchEditions();
    const reviewsData = await getReviews();
    data.forEach(async (item: { id: any }, i: any) => {
      const reviews = reviewsData.filter((revItem: { id: any }) => {
        return item.id === revItem.id;
      });

      data[i].reviews = await formatReviews(reviews);
    });
    return data;
  };

  const getReviews = async () => {
    const cadence = `
    import ReviewContract from 0xb880e7b2e2c0a70b

    pub fun main(): [ReviewContract.review] {
      return ReviewContract.getReviews()
    }
`;
    const resp = await executeScript(cadence, (arg: any, t: any) => []);
    return resp;
  };

  return (
    <div className="bg-white">
      <main className="pb-24">
        {/* Product grid */}
        <section aria-labelledby="products-heading" className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <div className="-mx-px grid grid-cols-2 gap-10 sm:mx-0 md:grid-cols-3 lg:grid-cols-3">
            {market && market.map((product: any) => <Card key={Math.random()} product={product} exchangeRates={exchangeRates} />)}
          </div>
        </section>
      </main>
    </div>
  );
}
