export interface Notification {

  notificationTypeId: number;
  description: string;
  entity: string;
  userId: number;
  username: string;
  notifyUserId: number;
  created: Date;
  recipeId: number;
  seen: boolean;
}

