import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/actions/wishlist.actions";
import toast from "react-hot-toast";

export function useWishlist() {
  const queryClient = useQueryClient();

  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await getWishlist();
      if (res && res.status === "success") {
        return res.data; 
      }
      return []; 
    },
    initialData: [], 
  });

  const addMutate = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (res) => {
      if (res?.status === "success") {
        toast.success("Added to Wishlist ❤️");
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    }
  });

  const removeMutate = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: (res) => {
      if (res?.status === "success") {
        toast.success("Removed from Wishlist");
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    }
  });

  return { wishlistQuery, addMutate, removeMutate };
}