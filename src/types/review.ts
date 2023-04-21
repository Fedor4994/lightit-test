export type Review = {
  text: string;
  rating: number;
  username: string;
  userId: string;
  isEdited?: boolean;
  productId: string;
  createdAt: string;
};
