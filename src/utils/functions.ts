export function ellipseAddress(address = "", width = 10): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const formatReviews = async (reviewList: any) => {
  const format: any = { featured: reviewList };
  const totalCount = reviewList.length;
  let counts: any = [
    { rating: 1, count: 0 },
    { rating: 2, count: 0 },
    { rating: 3, count: 0 },
    { rating: 4, count: 0 },
    { rating: 5, count: 0 }
  ];
  let avgSum = 0;
  const prom = reviewList.map((item: any) => {
    if (item.stars) {
      const countsP = counts;
      if (countsP && countsP.length > 0) {
        countsP.forEach((element: any, index: any) => {
          if (element.rating === Number(item.stars)) {
            countsP[index] = { ...element, count: element.count + 1 };
          }
        });
      }
      avgSum = avgSum + Number(item.stars);
      counts = countsP;
      return;
    }
  });
  const map = await Promise.all(prom);
  format.average = avgSum / totalCount;
  format.totalCount = totalCount;
  format.counts = counts;
  return format;
};
