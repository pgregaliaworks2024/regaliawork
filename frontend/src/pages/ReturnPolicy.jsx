import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="px-4 py-6 sm:px-8 sm:py-10 max-w-3xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-6">Refund and Return Policy</h1>
      <p className="text-gray-600 text-base mb-6">
      
      <strong>Thank You for Choosing Regalia!</strong> At Regalia, we’re dedicated to delivering a remarkable shopping experience. If you have questions regarding cancellations or returns, please take a moment to familiarize yourself with our policies below:
      </p>

      <h2 className="text-2xl font-semibold mb-4">Order Cancellation:</h2>
      <ul className="text-gray-600 text-base mb-6 list-disc list-inside pl-6">
        <li>
        We understand that sometimes circumstances change! To cancel your order, please get in touch with our customer support team before your order is packed. Generally, it takes about 48 to 72 hours for your order status to update to "Packed." If you contact us during this window, we’ll gladly assist you. Once the order is packed, we regret that we can no longer accommodate cancellation requests.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Return Policy:</h2>
      <ul className="text-gray-600 text-base mb-6 list-disc list-inside pl-6">
        <li>
          <strong>Returns Due to Damage:</strong> Your satisfaction is our priority. If you receive an item that is damaged, please inspect your order immediately upon arrival. Reach out to our customer support team right away, and we’ll work diligently to resolve the issue.
        </li>
        <li>
          <strong>Size or Design Concerns:</strong> To ensure your order aligns with your expectations, our team will confirm your order details via WhatsApp shortly after you place it. As a result, we are unable to accept returns for issues related to size or design.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Return Process:</h2>
      <ul className="text-gray-600 text-base mb-6 list-disc list-inside pl-6">
        <li>
        If your order qualifies for a return due to damage, please package the item securely and send it to the address provided in our email response. Be sure to include the parcel slip charge in your email to us, and we will add this amount to your refund. The refund process typically takes 5-7 business days from the time we receive your returned item.
        </li>
      </ul>
    </div>
  );
};

export default ReturnPolicy;
