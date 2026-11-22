export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxQUlrRY6GvS04KGCt3cYTwgb90x5GHk2p0MdbncdmkidPtFHIQFyr4miFpzuIc6x3-aQ/exec';

export interface OrderData {
  date: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
  products: string;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export async function sendOrderToGoogleSheet(order: OrderData): Promise<boolean> {
  try {
    const params = new URLSearchParams({
      date: order.date,
      fullName: order.fullName,
      phone: order.phone,
      city: order.city,
      address: order.address,
      notes: order.notes || '-',
      products: order.products,
      itemCount: order.itemCount.toString(),
      subtotal: order.subtotal.toString(),
      deliveryFee: order.deliveryFee.toString(),
      total: order.total.toString(),
    });

    // Send both in query params and in body (text/plain) to prevent CORS preflight
    // and support any Google Apps Script implementation (e.parameter or e.postData)
    await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(order),
    });

    return true;
  } catch (error) {
    console.error('Erreur lors de l’envoi de la commande vers Google Sheet:', error);
    return false;
  }
}
