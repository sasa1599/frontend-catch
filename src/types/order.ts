export interface IOrder {
  voucher_code: string;
  points_used: string;
  id: number;
  expires_at: string;
  final_price: number;
  total_price: number;
  status_order: string;
  point: number;
  coupon: boolean;
  OrderDetails: Array<{
    quantity: number;
    ticket: {
      id: number;
      price: number;
      seats: number;
      event: {
        id: number;
        title: string;
        thumbnail: string;
        datetime: string;
        location: string;
        venue: string;
      };
    };
  }>;
}
