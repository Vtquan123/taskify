import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => { 
    return [
      {
        source: '/settings',
        destination: '/settings/profile',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
