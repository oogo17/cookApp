export interface Review {
  created: Date;
  rate: number;
  userId: number;
  username: string;
  email: string;
  photoUrl: string;
  recipeId: number;
  description: string;
  status: string;
}
