export function formatPrice(price: number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

 export function formatRupiah(value: number): string {
    if (value == null || isNaN(value)) return "Rp 0";
    return `Rp ${value.toLocaleString("id-ID")}`;
  };