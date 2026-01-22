import React, { useState } from 'react';
import { CreditCard, Download, Check, ShieldCheck, FileText, Smartphone, Bitcoin } from 'lucide-react';
import { User } from '../types';

interface CheckoutProps {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
  addNotification: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const Checkout: React.FC<CheckoutProps> = ({ user, onSuccess, onCancel, addNotification }) => {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'paypal'>('card');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
        addNotification("Please agree to the terms and conditions.", "error");
        return;
    }
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
      addNotification("Payment Successful!", "success");
    }, 2000);
  };

  const handleDownloadInvoice = () => {
    const invoiceWindow = window.open('', '_blank');
    if (invoiceWindow) {
        const date = new Date().toLocaleDateString();
        const invoiceHTML = `
            <html>
            <head>
                <title>Invoice - Novabit</title>
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #333; }
                    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 40px; }
                    .logo { font-size: 24px; font-weight: bold; letter-spacing: -1px; }
                    .invoice-meta { text-align: right; }
                    .invoice-meta h1 { margin: 0; color: #666; font-size: 16px; text-transform: uppercase; }
                    .bill-to { margin-bottom: 40px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
                    th { text-align: left; border-bottom: 2px solid #eee; padding: 10px 0; color: #666; font-size: 12px; text-transform: uppercase; }
                    td { padding: 15px 0; border-bottom: 1px solid #eee; }
                    .total { font-size: 24px; font-weight: bold; text-align: right; margin-top: 20px; }
                    .footer { margin-top: 60px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">NOVABIT</div>
                    <div class="invoice-meta">
                        <h1>Invoice #INV-${Math.floor(Math.random() * 100000)}</h1>
                        <p>Date: ${date}</p>
                    </div>
                </div>
                
                <div class="bill-to">
                    <strong>Bill To:</strong><br>
                    ${user.name}<br>
                    ${user.email}
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Validity</th>
                            <th style="text-align: right;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Pro Subscription Plan</td>
                            <td>1 Year</td>
                            <td style="text-align: right;">₹2,10,000.00</td>
                        </tr>
                    </tbody>
                </table>

                <div class="total">Total: ₹2,10,000.00</div>

                <div class="footer">
                    <p>Terms & Conditions Apply. This is a computer generated invoice.</p>
                    <p>Novabit Inc. | Support: nova.officialm63@gmail.com</p>
                </div>
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `;
        invoiceWindow.document.write(invoiceHTML);
        invoiceWindow.document.close();
    } else {
        addNotification("Popup blocked. Please allow popups to download invoice.", "error");
    }
  };

  const handleContinue = () => {
    onSuccess();
  };

  if (paid) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 max-w-lg w-full text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Payment Successful</h2>
                <p className="text-neutral-400 mb-8">Thank you for your subscription, {user.name}. Your access is now active.</p>
                
                <div className="flex flex-col gap-4">
                    <button 
                        onClick={handleDownloadInvoice}
                        className="w-full bg-neutral-800 border border-neutral-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors"
                    >
                        <Download size={18} /> Print Official Invoice
                    </button>
                    <button 
                        onClick={handleContinue}
                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Order Summary */}
      <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-neutral-900/50 border-r border-neutral-800">
        <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Checkout</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Pro Subscription</h1>
        <div className="space-y-6">
            <div className="flex justify-between items-center py-4 border-b border-neutral-800">
                <span className="text-neutral-400">Monthly Plan</span>
                <span className="text-white font-bold text-xl">₹2,10,000.00</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-neutral-800">
                <span className="text-neutral-400">Tax</span>
                <span className="text-white font-bold text-xl">₹0.00</span>
            </div>
            <div className="flex justify-between items-center py-4 text-2xl">
                <span className="text-white">Total</span>
                <span className="text-blue-500 font-bold">₹2,10,000.00</span>
            </div>
        </div>
        <div className="mt-8 flex items-center gap-2 text-green-500 text-sm">
            <ShieldCheck size={16} /> Secure encrypted payment
        </div>
      </div>

      {/* Payment Form */}
      <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-black">
        <form onSubmit={handlePayment} className="max-w-md w-full mx-auto space-y-8">
            
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-4">
                <div onClick={() => setPaymentMethod('card')} className={`cursor-pointer p-4 border rounded-xl flex flex-col items-center gap-2 transition-colors ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-neutral-800 text-neutral-500 hover:border-neutral-700'}`}>
                    <CreditCard size={24} />
                    <span className="text-xs font-bold">Card</span>
                </div>
                <div onClick={() => setPaymentMethod('paypal')} className={`cursor-pointer p-4 border rounded-xl flex flex-col items-center gap-2 transition-colors ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-neutral-800 text-neutral-500 hover:border-neutral-700'}`}>
                    <Smartphone size={24} />
                    <span className="text-xs font-bold">PayPal</span>
                </div>
                <div onClick={() => setPaymentMethod('crypto')} className={`cursor-pointer p-4 border rounded-xl flex flex-col items-center gap-2 transition-colors ${paymentMethod === 'crypto' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-neutral-800 text-neutral-500 hover:border-neutral-700'}`}>
                    <Bitcoin size={24} />
                    <span className="text-xs font-bold">Crypto</span>
                </div>
            </div>

            {paymentMethod === 'card' && (
                <div className="space-y-6 animate-[fadeIn_0.5s_ease]">
                    <div>
                        <label className="block text-xs uppercase text-neutral-500 font-bold mb-2">Cardholder Name</label>
                        <input required type="text" placeholder={user.name} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-neutral-500 font-bold mb-2">Card Number</label>
                        <div className="relative">
                            <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 pl-12 text-white focus:border-blue-500 focus:outline-none" />
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase text-neutral-500 font-bold mb-2">Expiry Date</label>
                            <input required type="text" placeholder="MM/YY" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-white focus:border-blue-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-neutral-500 font-bold mb-2">CVC</label>
                            <input required type="text" placeholder="123" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-white focus:border-blue-500 focus:outline-none" />
                        </div>
                    </div>
                </div>
            )}

            {paymentMethod !== 'card' && (
                <div className="p-8 bg-neutral-900 rounded-xl text-center text-neutral-400">
                    <p>Redirecting to {paymentMethod === 'paypal' ? 'PayPal' : 'Coinbase'} secure gateway...</p>
                </div>
            )}

            <div className="pt-4 border-t border-neutral-800">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${agreed ? 'bg-blue-600 border-blue-600' : 'border-neutral-600 group-hover:border-neutral-400'}`}>
                        {agreed && <Check size={14} className="text-white" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={agreed} onChange={() => setAgreed(!agreed)} />
                    <span className="text-sm text-neutral-400 group-hover:text-neutral-300">
                        I adhere to the <span className="text-white underline">Terms and Conditions</span> and confirm that I have read the privacy policy.
                    </span>
                </label>
            </div>

            <div className="space-y-4">
                <button 
                    type="submit" 
                    disabled={loading || !agreed}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Confirm & Pay ₹2,10,000.00'}
                </button>
                
                <button type="button" onClick={onCancel} className="w-full text-neutral-500 text-sm hover:text-white transition-colors">
                    Cancel Transaction
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;