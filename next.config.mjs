/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: "res.cloudinary.com",
          },
          {
            hostname: "kpopworld.com",
          },
        ],
      },
};

export default nextConfig;
