'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useCart } from './cart-provider';

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef(null);
  const menuPanel = useRef(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    function handleKey(event) {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
      if (event.key === 'Tab') {
        const focusables = [menuButton.current, ...menuPanel.current.querySelectorAll('a')];
        const first = focusables[0], last = focusables.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    function handleClick(event) {
      if (!menuPanel.current?.contains(event.target) && !menuButton.current?.contains(event.target)) setOpen(false);
    }
    function handleResize() { if (window.innerWidth > 640) setOpen(false); }
    document.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handleClick);
    window.addEventListener('resize', handleResize);
    return () => { document.removeEventListener('keydown', handleKey); document.removeEventListener('pointerdown', handleClick); window.removeEventListener('resize', handleResize); };
  }, [open]);
  const links = <><Link href="/#catalog" onClick={() => setOpen(false)}>Каталог</Link><Link href="/#about" onClick={() => setOpen(false)}>О нас</Link><Link href="/#delivery" onClick={() => setOpen(false)}>Доставка</Link></>;

  return <header className="site-header">
    <div className="header-inner container">
      <Link href="/" className="wordmark" aria-label="МАНГАЛ — главная">МАНГАЛ<span className="brand-dot">.</span></Link>
      <nav className="desktop-nav" aria-label="Основная навигация">{links}</nav>
      <div className="header-actions">
        <Link href="/cart" className="cart-link icon-button" aria-label={`Корзина, товаров: ${count}`}><ShoppingCart size={28} strokeWidth={1.7} /><span className="cart-count" aria-hidden="true">{count > 0 ? count : ''}</span></Link>
        <button ref={menuButton} className="icon-button menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    {open && <nav ref={menuPanel} id="mobile-menu" className="mobile-nav" aria-label="Мобильная навигация">{links}<Link href="/cart" onClick={() => setOpen(false)}>Корзина {count > 0 && `(${count})`}</Link></nav>}
  </header>;
}
