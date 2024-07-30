/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    MESSAGINGSENDER_ID: process.env.NEXT_PUBLIC_MESSAGINGSENDER_ID,
  },
  env: {
    FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    MESSAGINGSENDER_ID: process.env.NEXT_PUBLIC_MESSAGINGSENDER_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
};

export default nextConfig;
