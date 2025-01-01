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

export interface IOrder {
  status_order: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
  id: number
  expiresAt: string;
  total_price: number;
  final_price: number;
  OrderDetails: ITicketOrder[];
}