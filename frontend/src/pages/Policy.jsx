import React from 'react';

const Policy = () => {
  return (
    <div className="px-4 py-6 sm:px-8 sm:py-10 max-w-3xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      <p className="text-gray-600 text-base mb-6">
        Welcome to Regalia! These Terms and Conditions govern your use of our website and the purchase of our products. By accessing our website or making a purchase, you agree to comply with and be bound by these terms.
      </p>

      <h3 className="text-xl font-semibold mb-4">1. Acceptance of Terms:</h3>
      <p className="text-gray-600 text-base">
        By using our website, you confirm that you accept these Terms and Conditions and that you agree to comply with them. If you do not agree with any part of these terms, you must not use our website.
      </p>

      <h3 className="text-xl font-semibold mb-4">2. Product Information:</h3>
      <p className="text-gray-600 text-base">
        We strive to ensure that the information on our website is accurate. However, we do not guarantee that all product descriptions, images, pricing, or other content is completely accurate, reliable, or error-free. We reserve the right to correct any errors and update information at any time without prior notice. Please note that prices may change from time to time.
      </p>

      <h3 className="text-xl font-semibold mb-4">3. Limited Stock:</h3>
      <p className="text-gray-600 text-base">
        The clothing items launched on our website are available in limited stock. Once an item is sold out, it will not be re-designed or made available again.
      </p>

      <h3 className="text-xl font-semibold mb-4">4. User Conduct:</h3>
      <p className="text-gray-600 text-base">
        When using our website, you agree not to:
      </p>
        <ul className="list-disc list-inside">
          <li>Engage in any unlawful or fraudulent activity.</li>
          <li>Post or transmit any content that is harmful, abusive, or otherwise objectionable.</li>
          <li>Interfere with the operation of our website or disrupt the experience of other users.</li>
          <li>Misbehave with our support team. We expect all interactions to be respectful and constructive.</li>
        </ul>
      

      <h3 className="text-xl font-semibold mb-4">5. User Data Protection:</h3>
      <p className="text-gray-600 text-base">
        At Regalia, we take your privacy seriously. We will protect your data and information and will not share it with any third parties without your consent.
      </p>
    </div>
  );
};

export default Policy;
