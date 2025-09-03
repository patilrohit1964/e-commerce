import { showToast } from "@/lib/toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteMutation = (queryKey, deleteEndPoint) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ids, deleteType }) => {
      const { data: res } = await axios({
        url: deleteEndPoint,
        method: deleteType === "PD" ? "DELETE" : "PUT",
        data: { ids, deleteType },
      });
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: (data) => {
      showToast("success", data.message);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      showToast("error", error.message);
    },
  });
};
