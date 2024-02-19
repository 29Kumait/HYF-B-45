import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../Account/AuthContext";
import ItemElement from "../list/ItemElement";
import "./UserInfo.css";

const UserInfo = () => {
  const { userData } = useAuth();
  const [items, setItems] = useState([]);

  const { performFetch, cancelFetch } = useFetch(
    `/transactions/${userData.user._id}`,

    (response) => {
      const newItems = response.items;
      setItems(newItems);
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  // Get user's locale
  const userLocale = navigator.language;

  return (
    <div>
      <h1>Hi {userData.user.username}</h1>
      {items.length > 0 && (
        <ul className="your-product-list">
          {items.map((item) => (
            <ItemElement key={item._id} item={item} userLocale={userLocale} />
          ))}
        </ul>
      )}

      {items.length === 0 && <h1>You have not borrowed any items yet.</h1>}
    </div>
  );
};

export default UserInfo;
