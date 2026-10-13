import Image from 'next/image';

export default function SiteImage({ src, ...props }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const path = typeof src === 'string' && src.startsWith('/') ? `${basePath}${src}` : src;
  return <Image src={path} {...props} />;
}
