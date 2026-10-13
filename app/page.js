import Image from '../components/site-image';
import Link from 'next/link';
import { ArrowRight, Layers3, Truck, ShieldCheck, Plus } from 'lucide-react';
import ProductCard from '../components/product-card';
import { products, faq } from '../data/products';

export default function Home() {
  return <main id="main">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-image"><Image src="/images/hero.webp" alt="Стальной мангал с шампурами, мясом и раскалёнными углями на фоне бетона" fill sizes="100vw" preload /></div>
      <div className="container hero-content"><p className="eyebrow hero-eyebrow">Стальные мангалы для настоящего отдыха</p><h1 id="hero-title"><span>Огонь. Мясо.</span><span>Хорошая компания.</span></h1><Link href="#catalog" className="button hero-button">Выбрать мангал <ArrowRight size={30} strokeWidth={1.5} /></Link><p className="hero-caption">Всё начинается с хорошего мангала.</p></div>
      <span className="hero-side-note" aria-hidden="true">СОБЕРИТЕ СВОИХ У ОГНЯ</span>
    </section>

    <section className="benefits" aria-label="На что обратить внимание"><div className="container benefits-grid">
      <div className="benefit"><Layers3 aria-hidden="true" size={54} strokeWidth={1.6} /><div><h2>Толстая сталь</h2><p>Основа хорошей жаровни</p></div></div>
      <div className="benefit"><Truck aria-hidden="true" size={54} strokeWidth={1.6} /><div><h2>Доставка по России</h2><p>До вашего города или участка</p></div></div>
      <div className="benefit"><ShieldCheck aria-hidden="true" size={54} strokeWidth={1.6} /><div><h2>Гарантия качества</h2><p>Поддержка после покупки</p></div></div>
    </div></section>

    <section id="catalog" className="catalog section container" aria-labelledby="catalog-title"><div className="section-heading"><div><p className="eyebrow">01 / Выберите свой мангал</p><h2 id="catalog-title">Мангал под ваш<br className="catalog-break" /> стиль отдыха</h2></div><p className="section-intro">От тихого вечера на даче<br />до встречи всей компании.</p></div><div className="product-grid">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>

    <section id="about" className="about-section" aria-labelledby="about-title"><div className="about-photo"><Image src="/images/workshop.webp" alt="Деталь стальной жаровни и сварного шва на рабочем столе в мастерской" fill sizes="(max-width: 767px) 100vw, 55vw" /></div><div className="about-copy"><p className="eyebrow">02 / Всё дело в конструкции</p><h2 id="about-title">Хороший мангал.<br />Без лишнего.</h2><p className="about-lead">Металл, который чувствуешь.<br />Детали, которые замечаешь.</p><p>Открытая жаровня, удобный доступ к углям и устойчивые опоры. Здесь каждая деталь нужна для одного — чтобы готовить было удобно.</p><p>Выбирайте конструкцию под свой ритм отдыха: компактную для дачи или с рабочей поверхностью для большой компании. Размеры и комплектация каждой модели — в каталоге.</p><Link href="#details" className="text-link">Рассмотреть детали <ArrowRight size={22} /></Link></div></section>

    <section id="details" className="details-section section container" aria-labelledby="details-title"><div className="section-heading"><div><p className="eyebrow">03 / Ближе к металлу</p><h2 id="details-title">Простые детали.<br />Большая разница.</h2></div><p className="section-intro">Что проверить<br />перед выбором.</p></div><div className="technical-layout"><div className="technical-image"><Image src="/images/pro.webp" alt="Мангал Профи: жаровня, боковая рабочая поверхность и нижняя полка" width={1200} height={800} sizes="(max-width: 767px) 100vw, 50vw" /><span className="image-label">Профи / детали конструкции</span></div><dl className="technical-list"><div><dt><span>01</span>Толщина стали</dt><dd>Сталь 3 и 4 мм в зависимости от модели. Сравните толщину стенок, размеры жаровни и вес, чтобы выбрать мангал под свои задачи.</dd></div><div><dt><span>02</span>Конструкция жаровни</dt><dd>Пазы фиксируют шампуры, а вентиляционные отверстия обеспечивают доступ воздуха к углям.</dd></div><div><dt><span>03</span>Всё под рукой</dt><dd>Боковая поверхность и нижняя полка у модели «Профи» освобождают место рядом с мангалом.</dd></div><div><dt><span>04</span>Комплектация</dt><dd>Проверьте, что входит в комплект. Шампуры, решётки и чехол подбираются отдельно.</dd></div></dl></div></section>

    <section id="delivery" className="delivery-section" aria-labelledby="delivery-title"><div className="container delivery-layout"><div><p className="eyebrow">04 / До вашего участка</p><h2 id="delivery-title">Вы выбрали.<br />Что дальше?</h2><p className="delivery-intro">Понятные условия<br />до оформления заказа.</p></div><div className="delivery-steps"><article><span>01</span><div><h3>Доставка</h3><p>Отправим мангал транспортной компанией до терминала или согласуем доставку до вашего адреса. Менеджер подберёт удобный вариант и заранее сообщит стоимость и срок — до подтверждения заказа.</p></div></article><article><span>02</span><div><h3>Оплата</h3><p>Заказ оформляется через менеджера. После согласования модели, комплектации и доставки он сообщит доступные способы оплаты и пришлёт реквизиты. Все детали заказа вы получите до оплаты.</p></div></article><article><span>03</span><div><h3>Получение и гарантия</h3><p>При получении осмотрите упаковку, жаровню и комплектность. Если возникнут вопросы по изделию, напишите менеджеру и приложите фотографии — поможем разобраться. Гарантийные условия согласуем при оформлении заказа.</p></div></article></div></div></section>

    <section id="faq" className="faq-section section container" aria-labelledby="faq-title"><div><p className="eyebrow">05 / Перед тем, как разжечь</p><h2 id="faq-title">Есть вопросы?</h2></div><div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary><span>{question}</span><Plus size={23} aria-hidden="true" /></summary><div className="faq-answer"><p>{answer}</p></div></details>)}</div></section>
  </main>;
}
