/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        HOSTNAME: process.env.NEXT_PBULIC_HOSTNAME,
    },
};

module.exports = nextConfig;