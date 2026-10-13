'use client';
import Image from './site-image';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useCart } from './cart-provider';
import { formatPrice } from '../data/products';

export default function ProductCard({ product }) {
  const { addItem, ready } = useCart();
  return <article className="product-card">
    <Link href={`/catalog/${product.slug}`} className="product-photo" aria-label={`Мангал ${product.name} — подробнее`}>
      <Image src={product.image} alt={`Стальной мангал ${product.name}, вид спереди и сбоку`} width={1200} height={800} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" />
      <span className="product-number">/{product.number}</span><span className="photo-arrow"><ArrowUpRight size={24} /></span>
    </Link>
    <div className="product-info">
      <p className="eyebrow">{product.category}</p>
      <h3><Link href={`/catalog/${product.slug}`}>Мангал {product.name}</Link></h3>
      <p className="product-specs">Сталь {product.steel} мм <span>·</span> {product.skewers} шампуров</p>
      <div className="product-purchase"><div><strong>{formatPrice(product.price)}</strong></div><button className="add-button" disabled={!ready} onClick={() => addItem(product.id)} aria-label={`Добавить ${product.name} в корзину`}><Plus size={20} /><span>В корзину</span></button></div>
    </div>
  </article>;
}
