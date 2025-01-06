interface IUser {
  avatar: string;
  full_name: string;
}

export interface IReview {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: IUser;
}

export interface FormReview {
  rating: number;
  comment: string;
}
