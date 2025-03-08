import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_URL
<<<<<<< HEAD
  },
  images: {
    domains : ['*', 'localhost']
  },
=======
  }
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
};

export default nextConfig;
