import useSWR from "swr";
import fetch from "@/lib/fetch";
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetch);

  return { data, error, isLoading, mutate };
};
export default useCurrentUser;
