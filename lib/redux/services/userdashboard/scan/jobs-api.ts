import { baseApi } from "@/lib/redux/services/base-api";
import type {  JobsListResponse } from "@/types/scan";

export const scansJobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listScanJobs: builder.query<JobsListResponse, { limit?: number; offset?: number; status?: string }>({
      query: ({ limit = 20, offset = 0, status }) => ({
        url: "scanner/scans/jobs",
        params: { limit, offset, status },
      }),
      providesTags: [{ type: "ScanJob", id: "LIST" }],
    }),
  }),
});

export const { useListScanJobsQuery } = scansJobsApi;
