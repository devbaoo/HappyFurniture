import { useEffect, useState } from "react";
import api from "../services/api";
import { sortCategoriesByOrder } from "../services/category.service";

export interface CategoryChild {
  id: number;
  name: string;
  imageUrl: string | null;
  parentId: number;
  sortOrder?: number | null;
  isActive: boolean;
}

export interface RootCategory {
  id: number;
  name: string;
  imageUrl: string | null;
  parentId: null;
  sortOrder?: number | null;
  isActive: boolean;
  children: CategoryChild[];
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
                ? sortCategoriesByOrder(category.children)
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
