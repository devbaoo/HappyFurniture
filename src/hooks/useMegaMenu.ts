import { useEffect, useState } from "react";
import api from "../services/api";
import { Category, sortCategoriesByOrder } from "../services/category.service";

export interface RootCategory extends Category {
  parentId: null;
  children: Category[];
}

const useMegaMenu = () => {
  const [categories, setCategories] = useState<RootCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ items: RootCategory[] }>("/Categories", {
        params: { pageSize: 100, pageNumber: 1 },
      })
      .then((res) => {
        const items = Array.isArray(res.data?.items) ? res.data.items : [];
        // Keep only root-level categories (parentId === null)
        const roots = sortCategoriesByOrder(
          items
            .filter((c) => c.parentId === null)
            .map((category) => ({
              ...category,
              children: Array.isArray(category.children)
                ? category.children
                : [],
            })),
        );
        setCategories(roots);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
};

export default useMegaMenu;
