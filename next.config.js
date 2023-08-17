/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: true,
    },
    redirects: async () => [
        { source: '/', destination: '/sign-in', permanent: false },
    ],
};

module.exports = nextConfig;
