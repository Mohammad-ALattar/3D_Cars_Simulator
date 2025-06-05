import { getTokenData } from "@/services/api";
import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const View3D = lazy(() => import("@/components/View3D"));

const ViewPage = () => {
  const { token } = useParams<{ token: string }>();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (token) {
      getTokenData(token)
        .then(() => setAuthorized(true))
        .catch(() => setAuthorized(false));
    }
  }, [token]);

  if (!authorized) return <div>Access Denied</div>;

  return (
    <Suspense fallback={<div>Loading 3D view...</div>}>
      <View3D />
    </Suspense>)
};

export default ViewPage;
