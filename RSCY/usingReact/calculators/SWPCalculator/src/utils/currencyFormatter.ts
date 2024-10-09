export const formatCurrency = (value) => {
  const formattedValue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(value));

   return value < 0 ? `₹ -${formattedValue.replace("₹", "")}` : formattedValue;
};
