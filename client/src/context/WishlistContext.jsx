import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

const LOCAL_KEY = "bihar-explorer-wishlist";

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    setWishlist(stored ? JSON.parse(stored) : []);
  }, []);

  const toggleWishlist = (slug) => {
    setWishlist((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug];

      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isInWishlist = (slug) => wishlist.includes(slug);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}