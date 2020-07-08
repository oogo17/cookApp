import { Photo } from './Photo';
import { Recipe } from './Recipe';
import { FollowUsers } from './FollowUsers';

export interface User {
  id: number;
  userName: string;
  age: number;
  dateCreated: Date;
  city?: string;
  country?: string;
  photoUrl?: string;
  photos?: Photo[];
  recipes?: Recipe[];
  followUsers?: FollowUsers[];
}
