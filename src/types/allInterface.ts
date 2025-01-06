// Enums
export enum ICategory {
  concert = "concert",
  sports = "sports",
  theater = "theater",
  fanmeet = "fanmeet",
  seminar = "seminar",
}

export enum ILocation {
  jakarta = "jakarta",
  bandung = "bandung",
  yogyakarta = "yogyakarta",
}

export enum IStatusOrder {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum ITicketCategory {
  VIP = "VIP",
  REGULAR = "REGULAR",
}

// Interfaces
export interface ICustomer {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  isVerify: boolean;
  ref_code?: string;
  referred_code?: string;
  created_at: Date;
  updated_at: Date;
  UserCoupon?: IUserCoupon[];
  UserPoint?: IUserPoint[];
  Order?: IOrder[];
  Review?: IReview[];
}

export interface IUserCoupon {
  id: number;
  is_redeem: boolean;
  discount_type: string; // "percentage" or "fixed"
  discount_value: number;
  created_at: Date;
  expired_at: Date;
  user_id: number;
  user: ICustomer;
  updated_at: Date;
}

export interface IUserPoint {
  id: number;
  point: number;
  created_at: Date;
  expired_at: Date;
  is_redeem: boolean;
  user_id: number;
  user: ICustomer;
}

export interface IOrderDetails {
  id: number;
  ticket_id: number;
  quantity: number;
  order_id: number;
  updated_at: Date;
  created_at: Date;
  order: IOrder;
  ticket: ITicket;
}

export interface IOrder {
  id: number;
  total_price: number;
  final_price: number;
  status_order: IStatusOrder;
  user_id: number;
  event_id: number;
  invoice_url: string;
  updated_at: Date;
  created_at: Date;
  OrderDetails?: IOrderDetails[];
  user: ICustomer;
  event: Event;
}

export interface IReview {
  id: number;
  description: string;
  rating: number;
  user_id: number;
  event_id: number;
  user: ICustomer;
  event: Event;
  updated_at: Date;
  created_at: Date;
}

export interface IPromotor {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  is_verify: boolean;
  updated_at: Date;
  created_at: Date;
  events?: Event[];
}

export interface IEvent {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  thumbnail: string;
  venue: string;
  slug: string;
  datetime: string;
  coupon_promotor: number
  promotor: {
    id: number;
    name: string;
    username: string;
    avatar: string | null;
  };
  tickets: ITicket[]
}

export interface ITicket {
  id: number;
  category: ITicketCategory;
  description: string;
  seats: number;
  maxSeats: number;
  price: number;
}

export interface Event1 {
  id: string;
  title: string;
  datetime: string;
  category: string;
  venue: string;
}

export interface FormValues {
  datetime: Date | null;

}
