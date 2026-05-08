import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/lib/redux/services/base-api";
import { projectApi } from "@/lib/redux/services/userdashboard/project/project-api";
import { scannerApi } from "@/lib/redux/services/userdashboard/scanner/scanner-api";
import { scansJobsApi } from "@/lib/redux/services/userdashboard/scan/jobs-api";
import { assetApi } from "@/lib/redux/services/userdashboard/asset/asset-api";
import { authApi } from "@/lib/redux/services/auth/auth-api";
import { toolsListApi } from "@/lib/redux/services/tools-list/tools-list";
import { categoryListApi } from "@/lib/redux/services/tools-list/category-list";
import { gatewayApi } from "@/lib/redux/services/gateway/gateway-api";
import { proxyApi } from "@/lib/redux/services/proxy/proxy-api";
import { gitApi } from "@/lib/redux/services/userdashboard/git/git-api";

export function makeStore() {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
