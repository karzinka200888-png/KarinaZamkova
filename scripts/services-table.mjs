// Генерує data/SERVICES.md — таблицю для звірки services.json з договорами.
// Запуск: node scripts/services-table.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../data/services.json', import.meta.url)));
const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('uk-UA') : n);
const price = (s) => {
  if (s.priceType === 'individual' || s.price === null) return 'індивідуально';
  if (s.price === 'TODO') return '**TODO**';
  return `${s.priceType === 'from' ? 'від ' : ''}${fmt(s.price)}`;
};
const out = ['# Послуги і ціни — звірка з договорами', '', `_${data._meta.source}_`, ''];

const fop = data.monthly.fop;
out.push('## 1. Щомісячно: ФОП', '', `**${fop.name}** — ${fop.description}`, '');
out.push('| Комплектація | 2 група, 1 рах. | 2 група, 2 рах. | 3 група, 1 рах. | 3 група, 2 рах. |', '|---|---:|---:|---:|---:|');
for (const s of fop.setups) {
  const g2 = fop.prices.group2[s.id];
  const g3 = fop.prices.group3[s.id];
  out.push(`| ${s.label} | ${fmt(g2[1])} | ${fmt(g2[2])} | ${fmt(g3[1])} | ${fmt(g3[2])} |`);
}
out.push('', '**Додатково до тарифу (на місяць):**', '', '| Послуга | Обсяг | Ціна |', '|---|---|---:|');
for (const a of Object.values(fop.addons)) {
  if (a.tiers) for (const t of a.tiers) out.push(`| ${a.label} | ${t.label ?? `до ${t.upTo}`} | ${t.price === null ? 'індивідуально' : t.price === 'TODO' ? '**TODO**' : fmt(t.price)} |`);
  else if (a.first) out.push(`| ${a.label} | 1-й / кожен наступний | ${fmt(a.first)} / ${fmt(a.next)} |`);
  else out.push(`| ${a.label} | — | ${a.priceType === 'from' ? 'від ' : '+'}${fmt(a.price)} |`);
}

const tov = data.monthly.tov;
const pr = tov.pricing;
out.push('', '## 2. Щомісячно: ТОВ', '', `**${tov.name}** — ${tov.description}`, '', `_${pr.baseNote} ${tov.vat}_`, '');
out.push('| Базова ставка (з 1 директором) | без ПДВ | з ПДВ |', '|---|---:|---:|');
out.push(`| Спрощена система | ${fmt(pr.base.simplified_noVat)} | ${fmt(pr.base.simplified_vat)} |`);
out.push(`| Загальна система | ${fmt(pr.base.general_noVat)} | ${fmt(pr.base.general_vat)} |`);
out.push('', '**Коефіцієнти до бази (множаться):** виробництво ×1,3 · роздріб/маркетплейси з ПРРО ×1,3 · ЗЕД ×1,5.');
out.push(`Не беремо: ${pr.notAccepted.join('; ')}.`);
if (pr.contractExample?.todo) out.push('', `**TODO:** ${pr.contractExample.todo}`);
out.push('', '**Доплати за показниками місяця** (⚠️ — продовження кроку договору, чекає підтвердження):', '', '| Показник | Обсяг | Ціна |', '|---|---|---:|');
for (const a of Object.values(tov.addons)) {
  if (a.tiers) for (const t of a.tiers) out.push(`| ${a.label} | ${t.label ?? `до ${t.upTo}`} | ${t.priceType === 'individual' ? 'індивідуально' : t.price === 'TODO' ? '**TODO**' : t.perUnitAbove ? `+${fmt(t.perUnitAbove)} за пакет` : fmt(t.price)}${t.extrapolated ? ' ⚠️' : ''} |`);
  if (a.perUnit) out.push(`| ${a.label} | за 1 шт. | ${fmt(a.perUnit)} |`);
  if (a.price) out.push(`| ${a.label} | ${a.unit} | ${fmt(a.price)} |`);
}

for (const [seg, title] of [['fop', 'ФОП'], ['tov', 'ТОВ']]) {
  out.push('', `## ${seg === 'fop' ? 3 : 4}. Разові та додаткові послуги: ${title}`, '');
  out.push('| Розділ | Послуга | Одиниця | Ціна, грн | Примітка |', '|---|---|---|---:|---|');
  for (const cat of data.oneOff[seg]) {
    for (const s of cat.items) {
      const pk = s.packages ? `пакети: ${s.packages.map((p) => `до ${p.upTo} шт — ${fmt(p.price)}`).join(', ')}` : '';
      out.push(`| ${cat.title} | ${s.name} | ${s.unit} | ${price(s)} | ${[pk, s.todo && `**TODO:** ${s.todo}`].filter(Boolean).join('; ')} |`);
    }
  }
}

out.push('', '## 5. Умови', '');
const t = data.terms;
out.push(`- ${t.introPeriod}`, `- Оплата ФОП: ${t.payment.fop}`, `- Оплата ТОВ: ${t.payment.tov}`, `- ${t.documentsDeadline}`,
  `- Зв'язок: ${t.communication}`, `- ${t.accounting1C}`, `- Конфіденційність: ${t.confidentiality}`, `- ${t.termination}`,
  `- Відповідальність ТОВ: ${t.liability.tov}`, `- Відповідальність ФОП: ${t.liability.fop}`);

writeFileSync(new URL('../data/SERVICES.md', import.meta.url), out.join('\n') + '\n');
console.log('data/SERVICES.md written');
