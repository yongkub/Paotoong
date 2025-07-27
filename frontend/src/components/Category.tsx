import { useEffect, useState } from "react";
import "../css/Txn.css";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

export interface ICategory {
  _id: string;
  _v: string;
  isExpense: boolean;
  name: string;
}
const Category = ({
  category,
  setEditingCat,
}: {
  category: string;
  setEditingCat: (newCatName: string, newCatIsExpense: boolean) => void;
}) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [showSelect, setShowSelect] = useState(false);
  const [cat, setCat] = useState(category);
  const [cats, setCats] = useState([]);
  const icon = cat.split("&")[0].trim().toLowerCase();
  const fetchCats = async () => {
    if (!user) {
      logout();
      return;
    }
    const response = await fetch("/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.status === 401) {
      logout();
      return;
    }
    if (!response.ok) {
      return;
    }
    const json = await response.json();
    setCats(json);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    setCat(category);
  }, [category]);

  const handleClickCat = (e: any, catName: string, isExpense: boolean) => {
    e.stopPropagation();
    setEditingCat(catName, isExpense);
    setShowSelect(false);
  };
  return (
    <div
      className="rounded-pill p-3 bg-black d-flex align-items-center text-white position-relative"
      onClick={() => setShowSelect((prev) => !prev)}
    >
      <img src={`src/assets/category/${icon}.svg`} className="cat-icon" />
      <span id="x">{cat}</span>
      {showSelect ? (
        <i className="bi bi-caret-up-fill ms-auto"></i>
      ) : (
        <i className="bi bi-caret-down-fill ms-auto"></i>
      )}
      {showSelect && (
        <div className="cat-select">
          {cats.map((cat: ICategory, ind) => {
            const catIconPath = cat.name.split("&")[0].trim().toLowerCase();
            return (
              <div
                onClick={(e) => handleClickCat(e, cat.name, cat.isExpense)}
                key={ind}
                className="cat-item"
              >
                <img src={`src/assets/category/${catIconPath}.svg`} />
                <span>{cat.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Category;
