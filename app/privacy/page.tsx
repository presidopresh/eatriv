export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#FEFDF8] px-4 py-10">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <a href="/" className="text-[#2D6A4F] text-sm hover:underline">← Back to Eatriv</a>
          <h1 className="text-3xl font-light text-[#1A1A1A] mt-4 mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">Last updated: May 2026</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 text-sm text-gray-600 leading-relaxed">

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">1. Information We Collect</h2>
            <p className="mb-2">We collect the following information when you use Eatriv:</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Account information:</strong> name, email address and password</li>
              <li>• <strong>Health information:</strong> age, weight, height, dietary preferences and fitness goals</li>
              <li>• <strong>Usage data:</strong> pages visited, features used and time spent on the app</li>
              <li>• <strong>Payment information:</strong> processed securely by Paystack and Dodo Payments — we never store your card details</li>
            </ul>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">2. How We Use Your Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="space-y-1 ml-4">
              <li>• Generate personalised meal plans and workout recommendations</li>
              <li>• Send meal, workout and hydration reminders</li>
              <li>• Process subscription payments</li>
              <li>• Improve our AI recommendations over time</li>
              <li>• Send important account and service updates</li>
            </ul>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">3. Data Storage and Security</h2>
            <p>Your data is stored securely using Supabase, a trusted cloud database provider. We use industry-standard encryption to protect your personal information. Your health data is treated with the highest level of confidentiality.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">4. Data Sharing</h2>
            <p className="mb-2">We do not sell your personal data to third parties. We only share your data with:</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Paystack</strong> — to process Nigerian payments</li>
              <li>• <strong>Dodo Payments</strong> — to process international payments</li>
              <li>• <strong>OpenRouter</strong> — to generate AI meal plans (no personal data is shared, only nutrition preferences)</li>
              <li>• <strong>Supabase</strong> — to store your account data securely</li>
            </ul>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">5. Cookies</h2>
            <p>Eatriv uses essential cookies to keep you logged in and remember your preferences. We do not use advertising or tracking cookies.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">6. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="space-y-1 ml-4">
              <li>• Access the personal data we hold about you</li>
              <li>• Request correction of inaccurate data</li>
              <li>• Request deletion of your account and all associated data</li>
              <li>• Export your data at any time</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at <a href="mailto:eatrivapp@gmail.com" className="text-[#2D6A4F] hover:underline">eatrivapp@gmail.com</a></p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">7. Children's Privacy</h2>
            <p>Eatriv is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">8. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of significant changes via email. Your continued use of Eatriv after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="font-medium text-[#1A1A1A] text-base mb-2">9. Contact Us</h2>
            <p>If you have questions about this privacy policy or how we handle your data, please contact us at <a href="mailto:eatrivapp@gmail.com" className="text-[#2D6A4F] hover:underline">eatrivapp@gmail.com</a></p>
          </section>

        </div>

        {/* Footer links */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <a href="/terms" className="text-[#2D6A4F] hover:underline">Terms of Service</a>
          <span className="mx-2">·</span>
          <a href="/" className="text-[#2D6A4F] hover:underline">Back to Eatriv</a>
        </div>

      </div>
    </main>
  );
}