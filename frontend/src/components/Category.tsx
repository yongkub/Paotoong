import { useEffect, useState } from "react";
import useFetchCat, { type IMappedCat } from "../hooks/useFetchCat";
import "../css/Txn.css";

export interface ICategory {
  _id: string;
  _v: string;
  isExpense: boolean;
  name: string;
}
const Category = ({
  category,
  isCatExpense,
  setEditingCat,
}: {
  category: string;
  isCatExpense: boolean;
  setEditingCat: (newCatName: string, newCatIsExpense: boolean) => void;
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const [cat, setCat] = useState(category);
  const [cats, setCats] = useState<IMappedCat[]>([]);
  const [isExpense, setIsExpense] = useState(true);
  const icon = cat.split("&")[0].trim().toLowerCase();

  const { getMappedCats } = useFetchCat();

  const fetchCats = async () => {
    const cats: IMappedCat[] = await getMappedCats();
    setCats(cats);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    setCat(category);
    setIsExpense(isCatExpense);
  }, [category, isCatExpense]);

  const filtCats = cats.find(
    (mapped) => mapped.isExpense === isExpense
  )?.filtCats;

  const handleClickCat = (e: any, catName: string, isExpense: boolean) => {
    e.stopPropagation();
    setEditingCat(catName, isExpense);
    setShowSelect(false);
  };

  const handleChangeType = (e: any, typeFlag: boolean) => {
    e.stopPropagation();
    setIsExpense(typeFlag);
  };
  return (
    <div
      className="rounded-pill p-3 bg-black d-flex align-items-center text-white position-relative"
      onClick={() => setShowSelect((prev) => !prev)}
    >
      <img src={`src/assets/category/${icon}.svg`} className="cat-icon" />
      <span className="sm-txt">{cat}</span>
      {showSelect ? (
        <i className="bi bi-caret-up-fill ms-auto"></i>
      ) : (
        <i className="bi bi-caret-down-fill ms-auto"></i>
      )}
      {showSelect && (
        <div className="cat-select">
          <div className="d-flex justify-content-center gap-3">
            <button
              className={isExpense ? "cat-btn chosen" : "cat-btn"}
              onClick={(e) => handleChangeType(e, true)}
            >
              Expenses
            </button>
            <button
              className={!isExpense ? "cat-btn chosen" : "cat-btn"}
              onClick={(e) => handleChangeType(e, false)}
            >
              Income
            </button>
          </div>
          {filtCats &&
            filtCats.map((cat: ICategory, ind) => {
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
