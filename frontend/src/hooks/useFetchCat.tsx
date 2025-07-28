import type { ICategory } from "../components/Category";
import useAuthContext from "./useAuthContext";
import useLogout from "./useLogout";

export interface IMappedCat {
  isExpense: boolean;
  filtCats: ICategory[];
}
const useFetchCat = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const fetchAllCats = async () => {
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
    return json;
  };
  const getMappedCats = async () => {
    const cats: ICategory[] = await fetchAllCats();
    const mapped: IMappedCat[] = [
      { isExpense: true, filtCats: [] },
      { isExpense: false, filtCats: [] },
    ];
    for (let cat of cats) {
      const catType = cat.isExpense;
      const matchCats = mapped.find(
        (mapCat: IMappedCat) => mapCat.isExpense === catType
      )?.filtCats;
      matchCats?.push(cat);
    }
    return mapped;
  };

  return { fetchAllCats, getMappedCats };
};

export default useFetchCat;
