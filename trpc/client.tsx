"use client"

import {createTRPCReact, httpBatchLink} from '@trpc/react-query'
import { AppRouter } from './routers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { makeQueryClient } from './query-client';
import React, { useState } from 'react';

export const trpc = createTRPCReact<AppRouter>()

let clientQueryClientSingleton: QueryClient;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
}

export function TRPCProvider({ children }: Readonly<{children: React.ReactNode}>) { 
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() => trpc.createClient({
    links: [
      httpBatchLink({
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/trpc`
      })
    ]
  }))

  return <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
    { children }  
  </QueryClientProvider>
    </trpc.Provider>
}