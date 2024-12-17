export interface IUser {
    id: number;
    username: string;
    name: string;
    email: string;
    password: string;
    avatar: string | null;
    isVerify: boolean;
    ref_code: string;
    referred_code: string | null;
    updated_at: Date | null;
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
  }
  
  export type UserType = (IUser & { role: "customer" }) | (IPromotor & { role: "promotor" });
  
