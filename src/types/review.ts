<<<<<<< HEAD
export interface IReview {
    rating: number
    comment: string
  }
=======
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
  user_id: string;
}

export interface FormReview {
  rating: number;
  comment: string;
}
>>>>>>> 4101a13cce36311b3205e52a57a6d5728abf5a35
