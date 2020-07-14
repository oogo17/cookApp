import { Ingredients } from './Ingredients';
import { Steps } from './Steps';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  persons: number;
  type: string;
  buyIngredients: string;
  photoUrl: string;
  created: Date;
  tips: string;
  allowShare: boolean;
  ingredients: Ingredients[];
  steps: Steps[];
}
