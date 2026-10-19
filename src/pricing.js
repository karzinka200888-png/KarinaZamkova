import {
  FOP_EMPLOYEE_PRICE,
  FOP_EXTRAS,
  FOP_OPERATIONS,
  FOP_PACKAGES,
  FOP_TARIFFS,
} from './data/content.js';

export const formatUAH = (n) => n.toLocaleString('uk-UA');

// Попередній розрахунок місячної вартості для ФОП.
// Повертає суму, рядки розрахунку і прапорці «від» / «індивідуально».
export function calculateFop(state) {
  const lines = [];
  let total = 0;
  let from = false;
  let individual = false;

  const base = FOP_TARIFFS[state.group][state.setup][state.accounts];
  lines.push([`Базовий тариф, ${state.group} група`, base]);
  total += base;

  const ops = FOP_OPERATIONS[state.operations];
  if (ops.price === null) individual = true;
  else if (ops.price > 0) {
    lines.push([`Операції понад тариф: ${ops.label.toLowerCase()}`, ops.price]);
    total += ops.price;
  }

  FOP_PACKAGES.forEach((pkg) => {
    const opt = pkg.options[state.packages[pkg.id]];
    if (opt.price > 0) {
      lines.push([pkg.title, opt.price]);
      total += opt.price;
    }
  });

  if (state.employees > 0) {
    const payroll = FOP_EMPLOYEE_PRICE.first + (state.employees - 1) * FOP_EMPLOYEE_PRICE.next;
    lines.push([`Зарплата і кадри: ${state.employees} прац.`, payroll]);
    total += payroll;
  }

  FOP_EXTRAS.forEach((extra) => {
    if (state.extras[extra.id]) {
      lines.push([extra.label, extra.price]);
      total += extra.price;
      if (extra.from) from = true;
    }
  });

  return { total, lines, from, individual };
}
