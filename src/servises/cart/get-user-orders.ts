export async function getUserOrders(userId: string) {

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  const data = await response.json();
  return data;
}