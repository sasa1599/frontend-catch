      // Mendefinisikan tipe data Coupon
      export interface Coupon2 {
        customer_id: string;
        code: string;
        discount: number;
        expiry_date: string;
        [key: string]: unknown; // Jika ada properti tambahan yang tidak terdefinisi
      }