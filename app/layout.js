import localFont from 'next/font/local';
import { CartProvider } from '../components/cart-provider';
import Header from '../components/header';
import Footer from '../components/footer';
import './globals.css';

const alumni = localFont({ src: '../public/fonts/AlumniSans-Variable.woff2', variable: '--font-display', display: 'swap', weight: '100 900' });
const golos = localFont({ src: '../public/fonts/GolosText-Variable.woff2', variable: '--font-body', display: 'swap', weight: '400 900' });

export const metadata = {
  title: { default: 'МАНГАЛ — огонь, мясо, хорошая компания', template: '%s | МАНГАЛ' },
  description: 'Стальные мангалы для дачи, пикника и большой компании. Сравните модели, изучите конструкцию и оформите заказ через менеджера.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return <html lang="ru" className={`${alumni.variable} ${golos.variable}`}><body><a href="#main" className="skip-link">Перейти к содержимому</a><CartProvider><Header />{children}<Footer /></CartProvider></body></html>;
}
