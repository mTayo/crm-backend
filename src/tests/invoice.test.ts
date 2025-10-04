// src/modules/invoice/invoice.test.ts
import { applyPayment, calculateInvoiceTotal } from '../modules/invoice/invoice.service';
// import { expect } from '@jest/globals'; // Not needed if using Jest's global expect

describe('Invoice Totals', () => {
  it('should correctly calculate subtotal, tax, and total', () => {
    const lineItems = [
      { quantity: 2, unitPrice: 50 },
      { quantity: 3, unitPrice: 30 },
    ];

    const taxRate = 0.1; // 10%
    const result = calculateInvoiceTotal(lineItems, taxRate);

    expect(result.subtotal).toBe(190);
    expect(result.tax).toBe(19);
    expect(result.total).toBe(209);
  });
});



describe('Payment Balance Updates', () => {
  it('should update remaining balance after payment', () => {
    const invoice = { total: 200, payments: [{ amount: 50 }] };
    const result = applyPayment(invoice, 100);
    expect(result.remaining).toBe(50);
  });

  it('should throw if payment exceeds remaining balance', () => {
    const invoice = { total: 200, payments: [{ amount: 180 }] };
    expect(() => applyPayment(invoice, 50)).toThrow('Payment exceeds remaining balance');
  });
});
