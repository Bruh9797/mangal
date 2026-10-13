'use client';
import { Minus, Plus } from 'lucide-react';

export default function Quantity({ value, onChange, label = 'Количество' }) {
  return <div className="quantity" role="group" aria-label={label}>
    <button type="button" disabled={value <= 1} onClick={() => onChange(value - 1)} aria-label={`Уменьшить: ${label}`}><Minus size={16} /></button>
    <input type="number" min="1" max="99" inputMode="numeric" aria-label={label} value={value} onChange={(event) => onChange(Math.max(1, Math.min(99, Math.floor(Number(event.target.value) || 1))))} />
    <button type="button" disabled={value >= 99} onClick={() => onChange(value + 1)} aria-label={`Увеличить: ${label}`}><Plus size={16} /></button>
  </div>;
}
