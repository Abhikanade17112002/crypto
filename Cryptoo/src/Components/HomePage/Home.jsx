import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoinsData, currencyType } = useContext(CoinContext);
  const [coinsDataList, setCoinsDataList] = useState([]);
  const [filterCoinsQuery, setFilterCoinsQuery] = useState("");

  const handleFilterQuery = (event) => {
    const query = event.target.value;
    setFilterCoinsQuery(query);

    if (query.length === 0) {
      setCoinsDataList(allCoinsData);
    }
  };

  const handleInputFormSubmit = (event) => {
    event.preventDefault();

    if (filterCoinsQuery.length === 0) {
      alert("Enter Coin Name");
      return;
    }

    const filteredData = allCoinsData.filter((coin) =>
      coin.name.toLowerCase().includes(filterCoinsQuery.toLowerCase())
    );
    setCoinsDataList(filteredData);
  };

  useEffect(() => {
    setCoinsDataList(allCoinsData);
  }, [allCoinsData]);

  return (
    <div className="home homecontainer">
      <div className="hero-section">
        <p>
          Welcome To The World's Largest CryptoCurrency MarketPlace. Sign Up To
          Explore More About Cryptos.
        </p>
        <form className="input-form" onSubmit={handleInputFormSubmit}>
          <input
            type="text"
            value={filterCoinsQuery}
            onChange={handleFilterQuery}
            placeholder="Search Crypto.."
          />
          <button type="submit"> Search </button>
        </form>

        <div className="crypto-table">
          <div className="table-layout header">
            <div className="coin-ranking">#</div>
            <div className="coin-name">Coins</div>
            <div className="price">Price</div>
            <div className="coin-change" style={{ textAlign: "center" }}>
              24 Hr Change
            </div>
            <div className="market-cap" style={{ textAlign: "end" }}>
              Market Cap
            </div>
          </div>
          {coinsDataList.slice(0, 10).map((data) => (
            <Link to={`/coin/${data.id}`} className="table-layout" key={data.id}>
              <p>{data.market_cap_rank}</p>
              <div>
                <img src={data.image} alt={data.name} className="coinimg" />
                <p>{data.name} - {data.symbol.toUpperCase()}</p>
              </div>
              <p className={data.current_price < 0 ? "red" : "green"}>
                {currencyType.symbol} {data.current_price.toFixed(2)}
              </p>
              <p className={data.price_change_percentage_24h < 0 ? "red" : "green"}>
                {data.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p style={{ textAlign: "end" }}>
                {currencyType.symbol} {data.market_cap.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
