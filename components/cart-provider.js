'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { products } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'mangal-cart-v1';
const clampQuantity = (value) => Math.max(1, Math.min(99, Math.floor(Number(value) || 1)));

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) {
        const merged = new Map();
        for (const item of saved) {
          if (item && products.some((p) => p.id === item.id) && Number.isFinite(item.quantity) && item.quantity > 0) {
            merged.set(item.id, { id: item.id, quantity: clampQuantity((merged.get(item.id)?.quantity || 0) + item.quantity) });
          }
        }
        setItems([...merged.values()]);
      }
    } catch { /* A corrupt or unavailable browser store must not prevent shopping. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* In-memory cart remains usable. */ }
    }
  }, [items, ready]);

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(''), 4500);
    return () => clearTimeout(timeout);
  }, [message]);

  function addItem(id, quantity = 1) {
    const product = products.find((p) => p.id === id);
    if (!product || !ready) return;
    setItems((current) => {
      const exists = current.find((item) => item.id === id);
      return exists
        ? current.map((item) => item.id === id ? { ...item, quantity: clampQuantity(item.quantity + clampQuantity(quantity)) } : item)
        : [...current, { id, quantity: clampQuantity(quantity) }];
    });
    setMessage(`«${product.name}» добавлен в корзину`);
  }

  function updateQuantity(id, quantity) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: clampQuantity(quantity) } : item));
  }

  const value = {
    items, ready, addItem, updateQuantity,
    removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + (products.find((p) => p.id === item.id)?.price || 0) * item.quantity, 0),
  };

  return <CartContext.Provider value={value}>
    {children}
    <div className={`toast ${message ? 'toast-visible' : ''}`} role="status" aria-live="polite" aria-atomic="true">
      {message && <><span>{message}</span><Link href="/cart" onClick={() => setMessage('')}>Открыть корзину →</Link><button className="icon-button" onClick={() => setMessage('')} aria-label="Закрыть уведомление"><X size={20} /></button></>}
    </div>
  </CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('Cart components must be inside CartProvider');
  return context;
}
