import { useEffect, useState } from "react";
import api from "../services/api";

export interface CategoryChild {
  id: number;
  name: string;
  imageUrl: string | null;
  parentId: number;
  isActive: boolean;
}

export interface RootCategory {
  id: number;
  name: string;
  imageUrl: string | null;
  parentId: null;
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
        // Keep only root-level categories (parentId === null)
        const roots = res.data.items.filter((c) => c.parentId === null);
        setCategories(roots);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
};

export default useMegaMenu;
