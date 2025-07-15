import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getTokenData } from "@/services/api";
import { CarCustomizationLoader } from "./ui/withLoading";

export default function TokenGuard({ children }) {
  const location = useLocation();
  const token = location.pathname.split("/")[2];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tokenData", token],
    queryFn: () => getTokenData(token!),
    enabled: !!token,
    retry: false,
  });

  if (!token) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#9B000E] via-black to-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-white text-xl font-medium tracking-wide mb-4">
            🔒 Access Required
          </div>
          <div className="text-red-300 text-sm font-mono">
            MISSING TOKEN
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <CarCustomizationLoader message="🎨 Loading Customization Studio..." />;
  }

  if (isError || !data?.verified) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#9B000E] via-black to-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-white text-xl font-medium tracking-wide mb-4">
            ❌ Access Denied
          </div>
          <div className="text-red-300 text-sm font-mono">
            INVALID TOKEN
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}