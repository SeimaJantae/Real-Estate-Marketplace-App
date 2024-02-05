import { Badge } from "antd";
import { Link } from "react-router-dom";

export default function UserAdCard({ ad }) {
  return (
    <div className="col-lg-3 p-4 gx-4" key={ad._id}>
      <Link to={`/user/ad/${ad.slug}`} style={{ textDecoration: "none" }}>
        <Badge.Ribbon text={`${ad?.type} for ${ad?.action}`} color={ad?.action === "Sell" ? "blue" : "red"}>
          <div className="card hoverable shadow">
            <img
              src={ad?.photos?.[0]?.Location}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              style={{ height: "170px", objectFit: "cover" }}
            />
            <div className="card-body">
              <div className="d-flex flex-column">
                <h4>{Intl.NumberFormat("en-US").format(ad?.price)} Bath</h4>
                <small>{ad?.title}</small>
                <small>{ad?.address}</small>
              </div>
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
