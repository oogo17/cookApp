import { Allergy } from './Allergy';
import { Photo } from './Photo';
import { Recipe } from './Recipe';
import { FollowUsers } from './FollowUsers';

export interface User {
  id: number;
  userName: string;
  email: string;
  age: number;
  dateCreated: Date;
  zipCode?: number;
  city?: string;
  state?: string;
  country?: string;
  photoUrl?: string;
  allergy?: Allergy[];
  photos?: Photo[];
  recipes?: Recipe[];
  followUsers?: FollowUsers[];
}
