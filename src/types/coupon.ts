
      export interface Coupon2 {
        customer_id: string;
        code: string;
        discount: number;
        expiry_date: string;
        [key: string]: unknown; 
      }
      export interface CouponData {
        id: number;
        customer_id: number;
        precentage: number;
        expired_at: string;
      }