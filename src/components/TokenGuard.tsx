import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getTokenData } from "@/services/api";

export default function TokenGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = location.pathname.split("/")[2]; 

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tokenData", token],
    queryFn: () => getTokenData(token!),
    enabled: !!token,
    retry: false,
  });

  if (!token) {
    return <div style={{ padding: 32 }}>🔒 Missing token</div>;
  }

  if (isLoading) {
    return <div style={{ padding: 32 }}>⏳ Verifying token...</div>;
  }
console.log(data?.verified , "verify")
  if (isError || !data?.verified) {
    return <div style={{ padding: 32 }}>❌ Invalid or unauthorized token</div>;
  }

  return <>{children}</>;
}
