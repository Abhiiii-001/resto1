export interface Category {
  id: string;
  name: string;
  thumbnail: string;
}

export interface AddCategoryInterface {
  name: string;
  thumbnail: File;
}

export interface UpdateCategoryInterface {
  id: string;
  name?: string;
  thumbnail?: string;
}
