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
      <div className="fixed inset-0  flex items-center justify-center z-50">
        <div className="text-center">
          <div className="bg-gradient-to-l to-[#9B000E] from-black text-transparent bg-clip-text text-xl font-medium tracking-wide mb-4">
            🔒 Access Required
          </div>
          <div className="bg-gradient-to-l to-[#9B000E] from-black text-transparent bg-clip-text text-sm ">
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
      <div className="fixed inset-0  flex items-center justify-center z-50">
        <div className="text-center">
          <div className="bg-gradient-to-l to-[#9B000E] from-black text-transparent bg-clip-text text-xl font-medium tracking-wide mb-4">
            ❌ Access Denied
          </div>
          <div className="bg-gradient-to-l to-[#9B000E] from-black text-transparent bg-clip-text text-sm ">
            INVALID TOKEN
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}