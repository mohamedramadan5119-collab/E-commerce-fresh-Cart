
const baseUrl = "https://ecommerce.routemisr.com/api/v1/wishlist";


export const getWishlistApi = async () => {
  const res = await fetch(baseUrl, {
    headers: { token: localStorage.getItem("userToken")! },
  });
  return res.json();
};


export const addToWishlistApi = async (productId: string) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("userToken")!,
    },
    body: JSON.stringify({ productId }),
  });
  return res.json();
};


export const removeFromWishlistApi = async (productId: string) => {
  const res = await fetch(`${baseUrl}/${productId}`, {
    method: "DELETE",
    headers: { token: localStorage.getItem("userToken")! },
  });
  return res.json();
};