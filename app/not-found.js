import Link from 'next/link';
export default function NotFound() { return <main id="main" className="container not-found"><p className="eyebrow">404 / Не нашлось</p><h1>Здесь пока<br />нет мангала.</h1><Link href="/#catalog" className="button">Вернуться в каталог →</Link></main>; }
