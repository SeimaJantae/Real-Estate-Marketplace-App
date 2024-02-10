// Home.js
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";

export default function Home() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [adsForSell, setAdsForSell] = useState([]);
  const [adsForRent, setAdsForRent] = useState([]);

  const search = false;
  const [searchKey, SetsearchKey] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads");
      setAdsForSell(data.adsForSell);
      setAdsForRent(data.adsForRent);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchKey === "") {
      fetchAds();
    } else {
      try {
        const { data } = await axios.get(`/ad/search/${searchKey}`);
        setAdsForSell(data.adsForSell);
        setAdsForRent(data.adsForRent);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container-lg">
      <form className="d-flex mt-4 col-4 offset-lg-4" onSubmit={handleSubmit}>
        <input
          className="form-control me-sm-2"
          type="search"
          placeholder="Search"
          value={searchKey}
          onChange={(e) => {
            console.log(e.target.value);
            SetsearchKey(e.target.value);
            if (e.target.value === "") fetchAds();
          }}
        />
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>

      <h5 className="mt-2">For Sell</h5>
      {/* <pre>{JSON.stringify({ adsForSell, adsForRent }, null, 4)}</pre> */}
      <div className="container">
        <div className="row">
          {adsForSell?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>

      <h5 className="mt-2">For Rent</h5>
      <div className="container">
        <div className="row">
          {adsForRent?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
