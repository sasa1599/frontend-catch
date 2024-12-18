// Enums
export enum ICategory {
  MUSIC = "MUSIC",
  SPORTS = "SPORTS",
  THEATER = "THEATER",
  FANMEET = "FANMEET",
  SEMINAR = "SEMINAR",
}

export enum ILocation {
  JAKARTA = "JAKARTA",
  BANDUNG = "BANDUNG",
  YOGYAKARTA = "YOGYAKARTA",
  PADANG = "PADANG",
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
  ticket: Ticket;
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
  avatar?: string;
  is_verify: boolean;
  updated_at: Date;
  created_at: Date;
  events?: Event[];
}

export interface IEvent {
  id?: number; // Optional
  slug?: string; // Optional
  title: string;
  description: string;
  category: ICategory;
  location: ILocation;
  venue: string;
  thumbnail?: string;
  datetime: string;
  promotor_id: number;
  updated_at: Date;
  created_at: Date;
  promotor: IPromotor;
  tickets?: Ticket[];
  Order?: IOrder[];
  Review?: IReview[];
}

export interface Ticket {
  id: number;
  category: ITicketCategory;
  description: string;
  seats: number;
  maxSeats: number;
  price: number;
  event_id: number;
  updated_at: Date;
  created_at: Date;
  event: Event;
  OrderDetails?: IOrderDetails[];
}
