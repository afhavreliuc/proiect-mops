import { getSongServer } from "@/app/actions/shazam";

interface DatasetCategory {
  label: string;
}

export interface Categories {
  categories: DatasetCategory[];
}

export const getSong = async (data: FormData) => {
  return await getSongServer(data);
};
