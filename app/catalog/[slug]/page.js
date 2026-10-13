import { notFound } from 'next/navigation';
import Image from '../../../components/site-image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { products } from '../../../data/products';
import ProductPurchase from '../../../components/product-purchase';
import ProductCard from '../../../components/product-card';

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = products.find((product) => product.slug === slug);
  return { title: p ? `Мангал ${p.name}` : 'Модель не найдена', description: p?.description };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = products.find((product) => product.slug === slug);
  if (!p) notFound();
  return <main id="main" className="product-page container"><Link href="/#catalog" className="back-link"><ArrowLeft size={18} /> Все мангалы</Link><div className="product-detail"><div className="detail-image"><Image src={p.image} alt={`Мангал ${p.name}`} width={1200} height={800} sizes="(max-width: 767px) 100vw, 55vw" preload /></div><div className="detail-info"><p className="eyebrow">{p.category} / {p.number}</p><h1>Мангал<br />{p.name}</h1><p className="detail-description">{p.description}</p><dl className="spec-table"><div><dt>Толщина стали</dt><dd>{p.steel} мм</dd></div><div><dt>Мест для шампуров</dt><dd>{p.skewers}</dd></div><div><dt>Габариты (Д × Ш × В)</dt><dd>{p.dimensions}</dd></div><div><dt>Вес</dt><dd>{p.weight}</dd></div></dl><ProductPurchase product={p} /></div></div><section className="product-bottom"><div><p className="eyebrow">Конструкция</p><h2>Всё на своём месте.</h2><ul className="feature-list">{p.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><div><p className="eyebrow">Что внутри</p><h2>Комплектация.</h2><p>{p.kit}</p><Link href="/#delivery" className="text-link">О доставке и оплате →</Link></div></section><section className="related-products"><p className="eyebrow">Ещё два повода собраться</p><h2>Другие модели</h2><div className="product-grid related-grid">{products.filter((product) => product.id !== p.id).map((product) => <ProductCard key={product.id} product={product} />)}</div></section></main>;
}
