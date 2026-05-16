export default function Terms() {
  return (
    <main className="min-h-screen bg-[#FEFDF8] px-4 py-10">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <a href="/" className="text-[#2D6A4F] text-sm hover:underline">← Back to Eatriv</a>
          <h1 className="text-3xl font-light text-[#1A1A1A] mt-4 mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400">Last updated: May 2026</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 text-sm text-gray-600 leading-relaxed">

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using Eatriv ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">2. Description of Service</h2>
            <p>Eatriv is an AI-powered nutrition coaching application that provides personalised meal plans, grocery lists, workout reminders and progress tracking. Our service is available at eatriv.vercel.app.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">3. User Accounts</h2>
            <p>To use Eatriv, you must create an account with a valid email address. You are responsible for maintaining the confidentiality of your account credentials. You must be at least 13 years old to use this service.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">4. Subscription and Payments</h2>
            <p>Eatriv offers a free plan and a Pro subscription at ₦2,999/month for Nigerian users and $4.99/month for international users. Payments are processed securely by Paystack (Nigerian users) and Dodo Payments (international users). Subscriptions renew automatically each month until cancelled.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">5. Cancellation and Refunds</h2>
            <p>You may cancel your subscription at any time from your account settings. Cancellations take effect at the end of the current billing period. We do not offer refunds for partial months of service.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">6. Health Disclaimer</h2>
            <p>Eatriv provides general nutrition information and AI-generated meal plans for informational purposes only. Our service is not a substitute for professional medical advice, diagnosis or treatment. Always consult a qualified healthcare provider before making significant changes to your diet or exercise routine.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">7. Intellectual Property</h2>
            <p>All content, features and functionality of Eatriv are owned by Eatriv and are protected by applicable intellectual property laws. You may not copy, modify or distribute our content without prior written permission.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">8. Limitation of Liability</h2>
            <p>Eatriv shall not be liable for any indirect, incidental, special or consequential damages arising from your use of the service. Our total liability to you shall not exceed the amount you paid us in the past 12 months.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">9. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of significant changes via email. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">10. Contact</h2>
            <p>For questions about these terms, please contact us at <a href="mailto:eatrivapp@gmail.com" className="text-[#2D6A4F] hover:underline">eatrivapp@gmail.com</a></p>
          </section>

        </div>
      </div>
    </main>
  );
}