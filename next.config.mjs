const pages = process.env.GITHUB_PAGES === 'true';
const nextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  ...(pages ? {
    output: 'export',
    trailingSlash: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/mangal',
    images: { unoptimized: true },
  } : {}),
};
export default nextConfig;
