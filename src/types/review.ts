interface IUser {
  avatar: string;
  name: string;
}

export interface IReview {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: IUser;
  user_id:string
}

export interface FormReview {
  rating: number;
  comment: string;
}
