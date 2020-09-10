export interface Notification {

  notificationTypeId: number;
  description: string;
  entity: string;
  userId: number;
  notifyUserId: number;
  created: Date;
  recipeId: number;
  seen: boolean;
}

