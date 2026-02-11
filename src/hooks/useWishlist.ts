import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/actions/wishlist.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; 

export function useWishlist() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { status } = useSession();

  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await getWishlist();
      if (res && res.status === "success") {
        return res.data; 
      }
      return []; 
    },
    enabled: status === "authenticated",
    initialData: [], 
  });

  const addMutate = useMutation({
    mutationFn: async (productId: string) => {
      if (status !== "authenticated") {
        router.push("/login");
        throw new Error("Login required");
      }

      return await addToWishlist(productId);
    },
    onSuccess: (res) => {
      if (res?.status === "success") {
        toast.success("Added to Wishlist ");
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    },
    onError: (err) => {
        if (err.message !== "Login required") {
            toast.error("Something went wrong");
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