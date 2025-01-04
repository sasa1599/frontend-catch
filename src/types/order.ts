interface ITicketOrder {
  quantity: number;
  subPrice: number;
  ticket: {
    desciption: string;
    price: number;
    event: {
      title: string;
      thumbnail: string;
      datetime: string;
      location: string;
      venue: string;
    };
  };
}

// export interface IOrder {
//   status_order: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
//   id: number
//   expiresAt: string;
//   total_price: number;
//   final_price: number;
//   OrderDetails: ITicketOrder[];
// }

export interface IOrder {
  id: number;
  expires_at: string;
  final_price: number;
  total_price: number;
  status_order: string;
  points_used?: number;
  voucher_code?: string;
  OrderDetails: Array<{
    quantity: number;
    ticket: {
      id: number;
      price: number;
      seats: number;
      event: {
      title: string;
      thumbnail: string;
      datetime: string;
      location: string;
      venue: string;
      }
    }
  }>;
}
