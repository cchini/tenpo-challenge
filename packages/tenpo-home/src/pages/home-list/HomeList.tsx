import { useEffect, useState } from 'react';
import { coingecko } from '@tenpo/services';

const HomeList = () => {
  const [data, setData] = useState(null);
  const SIZE = 10;

  const getCoins = async (page: number, size: number) => {
    const response = await coingecko.getCoins(page, size);
    setData(response?.data);
    console.debug(response?.data);
  };

  useEffect(() => {
    if (data === null) getCoins(10, SIZE);
  }, []);

  return <div>HomeList</div>;
};

export default HomeList;
