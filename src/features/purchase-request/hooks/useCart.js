import { useMemo, useState } from 'react';
import { EXPEDITIONS, PAYMENT_METHODS, TAX_RATE } from '../data/products';

// Semua state & logic keranjang dikumpulin di sini (qty, ekspedisi, metode bayar,
// total, submit) biar komponen tinggal terima data + callback lewat props.
export function useCart(products) {
  const [quantities, setQuantities] = useState({});
  const [expeditionId, setExpeditionId] = useState(EXPEDITIONS[0].id);
  const [paymentMethodId, setPaymentMethodId] = useState(PAYMENT_METHODS[0].id);
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const setQuantity = (productId, nextQty) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const clamped = Math.min(Math.max(nextQty, 0), product.stock);

    setQuantities((prev) => {
      const next = { ...prev };
      if (clamped <= 0) {
        delete next[productId];
      } else {
        next[productId] = clamped;
      }
      return next;
    });
  };

  const removeItem = (productId) => setQuantity(productId, 0);

  const cartItems = useMemo(() => {
    return Object.entries(quantities)
      .map(([productId, qty]) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return null;
        return { product, quantity: qty, lineTotal: product.price * qty };
      })
      .filter(Boolean);
  }, [quantities, products]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartItems]
  );

  const tax = useMemo(() => Math.round(subtotal * TAX_RATE), [subtotal]);

  const expedition = EXPEDITIONS.find((e) => e.id === expeditionId) ?? EXPEDITIONS[0];
  const shippingCost = cartItems.length > 0 ? expedition.cost : 0;

  const total = subtotal + tax + shippingCost;

  const isEmpty = cartItems.length === 0;

  const submitOrder = () => {
    if (isEmpty || status === 'submitting') return;
    setStatus('submitting');
    // Simulasi proses submit ke server (mock, tidak terhubung backend)
    setTimeout(() => {
      setStatus('success');
      setQuantities({});
      setTimeout(() => setStatus('idle'), 2500);
    }, 1500);
  };

  return {
    quantities,
    cartItems,
    isEmpty,
    subtotal,
    tax,
    shippingCost,
    total,
    expeditionId,
    setExpeditionId,
    paymentMethodId,
    setPaymentMethodId,
    setQuantity,
    removeItem,
    submitOrder,
    status,
  };
}
