import React, { useEffect, useState, useContext } from "react";
import { CoinContext } from "../../Context/CoinContext";
import { useParams } from "react-router-dom";
import LineChart from "../LineChart/LineChart";
import Loader from "../Loader/Loader";
import "./Coin.css"; // Import the CSS file

const Coin = () => {
  const { currencyType } = useContext(CoinContext);
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [coinRank, setCoinRank] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [change24h, setChange24h] = useState(null);
  const [marketCap, setMarketCap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        };

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currencyType.name}&days=10`,
          options
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error("Fetch historical data error:", error);
      }
    };

    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
              // "X-Cg-Api-Key": "CG-EffMEBBDW3KUzfV7M85xH5Up", // Only if required
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCoinData(data);

        // Additional details
        setCoinRank(data.market_cap_rank);
        setCurrentPrice(data.market_data.current_price[currencyType.name]);
        setChange24h(data.market_data.price_change_percentage_24h);
        setMarketCap(data.market_data.market_cap[currencyType.name]);
      } catch (error) {
        console.error("Fetch coin data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currencyType]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="coin">
      <div className="coin-name container">
        <img
          src={coinData.image.large}
          alt={coinData.name}
          className="coinimage"
        />
        <p>
          {coinData.name} ({currencyType.symbol}
          {coinData.symbol.toUpperCase()})
        </p>
      </div>
      <div className="coin-table">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Current Price</th>
              <th>24h Change (%)</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{coinRank}</td>
              <td>{currentPrice}</td>
              <td>{change24h.toFixed(2)}%</td>
              <td>{marketCap}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="coin-chart">
        <LineChart historicaldata={historicalData}  />
      </div>
    </div>
  );
};

export default Coin;
