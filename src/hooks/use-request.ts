import { useMutation, useQuery } from '@tanstack/react-query';

import { httpClient } from '../libs/http-client';
import { apiRoutes, type HttpMethod } from '../services/api/api-routes';

type ExtractFormSchemaType<
  R extends keyof typeof apiRoutes,
  M extends keyof (typeof apiRoutes)[R]['methods'],
> = (typeof apiRoutes)[R]['methods'][M] extends {
  formSchema: infer S;
}
  ? S
  : undefined;

type ExtractResponseType<
  R extends keyof typeof apiRoutes,
  M extends keyof (typeof apiRoutes)[R]['methods'],
> = (typeof apiRoutes)[R]['methods'][M] extends {
  responseSchema: { parse: (data: any) => infer T };
}
  ? T
  : unknown;

type ExtractPayloadType<
  R extends keyof typeof apiRoutes,
  M extends keyof (typeof apiRoutes)[R]['methods'],
> = (typeof apiRoutes)[R]['methods'][M] extends {
  formSchema: { parse: (data: any) => infer T };
}
  ? T
  : Record<string, unknown>;

type ExtractRouteParams<T extends string> = string extends T
  ? Record<string, string>
  : T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param]: string | number } & ExtractRouteParams<`/${Rest}`>
    : T extends `${string}:${infer Param}`
      ? { [K in Param]: string | number }
      : never;

type RouteParamsProp<R extends string> =
  ExtractRouteParams<R> extends never
    ? { params?: never }
    : { params: ExtractRouteParams<R> };

type UseRequestProps<
  R extends keyof typeof apiRoutes,
  M extends keyof (typeof apiRoutes)[R]['methods'],
> = {
  route: R;
  method: M & HttpMethod;
  autoFetch?: boolean;
  queryKey?: string | unknown[];
  queryParams?: Record<string, unknown>;
} & RouteParamsProp<R extends string ? R : string>;

function callHttpMethod(
  method: HttpMethod,
  url: string,
  payload?: unknown,
  queryParams?: Record<string, unknown>,
) {
  switch (method) {
    case 'get':
      return httpClient.get(url, { params: queryParams });
    case 'post':
      return httpClient.post(url, payload, { params: queryParams });
    case 'put':
      return httpClient.put(url, payload, { params: queryParams });
    case 'patch':
      return httpClient.patch(url, payload, { params: queryParams });
    case 'delete':
      return httpClient.delete(url, { params: queryParams });
  }
}

export function useRequest<
  R extends keyof typeof apiRoutes,
  M extends keyof (typeof apiRoutes)[R]['methods'],
>(props: UseRequestProps<R, M>) {
  const {
    route,
    method,
    autoFetch = false,
    queryKey,
    params,
    queryParams,
  } = props as UseRequestProps<R, M> & {
    params?: Record<string, string | number>;
  };

  const routeConfig = apiRoutes[route as keyof typeof apiRoutes] as any;
  const methodConfig = routeConfig.methods[method];
  const httpMethod = method as HttpMethod;

  const parsedRoute = params
    ? Object.entries(params as Record<string, string | number>).reduce(
        (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
        route as string,
      )
    : (route as string);

  const defaultQueryKey = params ? [route, params] : [route];
  const finalQueryKey = queryKey
    ? Array.isArray(queryKey)
      ? queryKey
      : [queryKey]
    : defaultQueryKey;

  const { data, isLoading, refetch } = useQuery({
    queryKey: [...finalQueryKey, httpMethod, parsedRoute, queryParams],
    queryFn: async () => {
      const response = await callHttpMethod(
        httpMethod,
        parsedRoute,
        undefined,
        queryParams,
      );
      return response?.data;
    },

    select: (data: unknown) => {
      const parsedData = methodConfig?.responseSchema?.parse(data) ?? data;
      return parsedData as ExtractResponseType<R, M>;
    },
    enabled: autoFetch,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: ExtractPayloadType<R, M>) => {
      const response = await callHttpMethod(httpMethod, parsedRoute, payload);
      return response?.data;
    },
  });

  return {
    data,
    isLoading: isLoading || isPending,
    refetch,
    mutate,
    formSchema: methodConfig?.formSchema as ExtractFormSchemaType<R, M>,
  };
}
