'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Quantity from './quantity';
import { useCart } from './cart-provider';
import { formatPrice } from '../data/products';

export default function ProductPurchase({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, ready } = useCart();
  return <div className="detail-purchase"><div className="detail-price"><strong>{formatPrice(product.price)}</strong><span>Цена за 1 шт.</span></div><div className="detail-buy-row"><Quantity value={quantity} onChange={setQuantity} /><button className="button" disabled={!ready} onClick={() => addItem(product.id, quantity)}>В корзину <ArrowRight size={23} /></button></div><p className="small-note">Комплектацию и доставку согласуем с менеджером.</p></div>;
}
