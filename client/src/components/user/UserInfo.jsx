import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../Account/AuthContext";
import ItemElement from "../list/ItemElement";
import UserProfile from "./UserProfile";
import "./UserInfo.css";

const UserInfo = () => {
  const { userData } = useAuth();
  const [listedItems, setListedItems] = useState([]);
  const [rentedItems, setRentedItems] = useState([]);
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const { performFetch, cancelFetch } = useFetch(
    `/transactions/${userData.user._id}`,
    (response) => {
      setBorrowedItems(response.borrowedItems);
      setRentedItems(response.rentedItems);
      setListedItems(response.listedItems);
      setIsLoading(false);
    },
    (error) => {
      setError(error);
      setIsLoading(false);
    }
  );

  useEffect(() => {
    setIsLoading(true);
    performFetch();
    return cancelFetch;
  }, []);

  // Get user's locale
  const userLocale = navigator.language;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage(
        "Order placed successfully! The item has been rented out. You will receive a confirmation email shortly."
      );
    }

    if (query.get("canceled")) {
      setMessage(
        "Unfortunately, order canceled - continue with purchase when you're ready."
      );
    }
  }, []);

  return (
    <div>
      <UserProfile user={userData.user} />
      {message && <p className="message">{message}</p>}
      <div>
        {isLoading && <h3 className="loading-message">Loading...</h3>}
        {error && <h3 className="error-message">Error: {error.message}</h3>}
        {!isLoading && !error && (
          <div>
            <h2 className="items-title">Listed Items</h2>
            {listedItems.length > 0 ? (
              <ul className="your-product-list">
                {listedItems.map((item) => (
                  <ItemElement
                    key={item._id}
                    item={item}
                    userLocale={userLocale}
                  />
                ))}
              </ul>
            ) : (
              <h3 className="empty-message">
                You have not listed any items yet.
              </h3>
            )}

            <h2 className="items-title">Rented Items</h2>
            {rentedItems.length > 0 ? (
              <ul className="your-product-list">
                {rentedItems.map((item) => (
                  <ItemElement
                    key={item._id}
                    item={item}
                    userLocale={userLocale}
                  />
                ))}
              </ul>
            ) : (
              <h3 className="empty-message">
                You have not rented out any items yet.
              </h3>
            )}

            <h2 className="items-title">Borrowed Items</h2>
            {borrowedItems.length > 0 ? (
              <ul className="your-product-list">
                {borrowedItems.map((item) => (
                  <ItemElement
                    key={item._id}
                    item={item}
                    userLocale={userLocale}
                  />
                ))}
              </ul>
            ) : (
              <h3 className="empty-message">
                You have not borrowed any items yet.
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
