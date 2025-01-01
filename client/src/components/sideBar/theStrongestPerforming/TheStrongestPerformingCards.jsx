import { useState, useEffect } from 'react';
import Papa from 'papaparse';


const TheStrongestPerformingCards = () => {

  const [stocks, setStocks] = useState([]);

  const getCurrentDate = () => {
    const date = new Date();

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };
  // console.log('The current date is: '+ getCurrentDate());

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      console.log(csv);
    };
  }, []);


  return (
    <div>

    </div>
  );
};

export default TheStrongestPerformingCards;
