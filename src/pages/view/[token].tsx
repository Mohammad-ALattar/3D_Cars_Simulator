import TokenGuard from "@/components/TokenGuard";
import { lazy, Suspense } from "react";
const View3D = lazy(() => import("@/components/View3D"));

const ViewPage = () => {
  return (
    <TokenGuard>
      <View3D />
    </TokenGuard>
  );
};

export default ViewPage;
