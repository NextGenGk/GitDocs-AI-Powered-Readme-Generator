import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions - README Generator</title>
        <meta
          name="description"
          content="Terms and Conditions for README Generator application"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8 sm:px-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Terms & Conditions
                </h1>
                <p className="text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-gray-700 mb-4">
                    By accessing and using README Generator ("Service," "we,"
                    "us," or "our"), you accept and agree to be bound by the
                    terms and provision of this agreement.
                  </p>
                  <p className="text-gray-700">
                    If you do not agree to abide by the above, please do not use
                    this Service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    2. Description of Service
                  </h2>
                  <p className="text-gray-700 mb-4">
                    README Generator is a web-based application that helps users
                    create professional README files for their software
                    projects. Our Service includes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Automated README file generation</li>
                    <li>Customizable templates and formatting options</li>
                    <li>Integration with various project management tools</li>
                    <li>Export functionality in multiple formats</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    3. User Accounts and Registration
                  </h2>
                  <p className="text-gray-700 mb-4">
                    To access certain features of our Service, you may be
                    required to create an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Provide accurate, current, and complete information</li>
                    <li>
                      Maintain and update your information to keep it accurate
                    </li>
                    <li>Maintain the security of your password and account</li>
                    <li>
                      Accept responsibility for all activities under your
                      account
                    </li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    4. Acceptable Use Policy
                  </h2>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    4.1 Permitted Uses
                  </h3>
                  <p className="text-gray-700 mb-4">
                    You may use our Service for legitimate business and personal
                    purposes in accordance with these Terms.
                  </p>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    4.2 Prohibited Uses
                  </h3>
                  <p className="text-gray-700 mb-4">
                    You agree not to use the Service:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>
                      For any unlawful purpose or to solicit others to unlawful
                      acts
                    </li>
                    <li>
                      To violate any international, federal, provincial, or
                      state regulations, rules, laws, or local ordinances
                    </li>
                    <li>
                      To infringe upon or violate our intellectual property
                      rights or the intellectual property rights of others
                    </li>
                    <li>
                      To harass, abuse, insult, harm, defame, slander,
                      disparage, intimidate, or discriminate
                    </li>
                    <li>To submit false or misleading information</li>
                    <li>
                      To upload or transmit viruses or any other type of
                      malicious code
                    </li>
                    <li>
                      To spam, phish, pharm, pretext, spider, crawl, or scrape
                    </li>
                    <li>For any obscene or immoral purpose</li>
                    <li>
                      To interfere with or circumvent the security features of
                      the Service
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    5. Intellectual Property Rights
                  </h2>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    5.1 Our Content
                  </h3>
                  <p className="text-gray-700 mb-4">
                    The Service and its original content, features, and
                    functionality are and will remain the exclusive property of
                    README Generator and its licensors. The Service is protected
                    by copyright, trademark, and other laws.
                  </p>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    5.2 User Content
                  </h3>
                  <p className="text-gray-700 mb-4">
                    You retain ownership of any content you submit, post, or
                    display on or through the Service ("User Content"). By
                    submitting User Content, you grant us a worldwide,
                    non-exclusive, royalty-free license to use, reproduce,
                    modify, and distribute your User Content in connection with
                    the Service.
                  </p>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    5.3 Generated Content
                  </h3>
                  <p className="text-gray-700">
                    README files and other content generated using our Service
                    belong to you. We do not claim ownership over the output
                    generated by our tools.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    6. Privacy Policy
                  </h2>
                  <p className="text-gray-700">
                    Your privacy is important to us. Please review our Privacy
                    Policy, which also governs your use of the Service, to
                    understand our practices.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    7. Payment Terms
                  </h2>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    7.1 Free Services
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Basic features of our Service are provided free of charge.
                    We reserve the right to limit usage of free services.
                  </p>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    7.2 Premium Services
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Premium features may be available for a fee. All fees are
                    non-refundable unless otherwise stated. We reserve the right
                    to change our pricing at any time.
                  </p>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    7.3 Billing
                  </h3>
                  <p className="text-gray-700">
                    For paid services, you agree to pay the applicable fees as
                    they become due. Failure to pay may result in suspension or
                    termination of your account.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    8. Service Availability
                  </h2>
                  <p className="text-gray-700">
                    We strive to maintain high availability of our Service but
                    do not guarantee uninterrupted access. We may suspend or
                    discontinue the Service at any time, with or without notice,
                    for maintenance, updates, or other reasons.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    9. Disclaimers and Limitation of Liability
                  </h2>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    9.1 Disclaimers
                  </h3>
                  <p className="text-gray-700 mb-4">
                    The Service is provided "as is" and "as available" without
                    any warranties of any kind. We disclaim all warranties,
                    express or implied, including but not limited to
                    merchantability, fitness for a particular purpose, and
                    non-infringement.
                  </p>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    9.2 Limitation of Liability
                  </h3>
                  <p className="text-gray-700">
                    In no event shall README Generator, its directors,
                    employees, partners, agents, suppliers, or affiliates be
                    liable for any indirect, incidental, punitive,
                    consequential, or special damages arising out of or related
                    to your use of the Service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    10. Indemnification
                  </h2>
                  <p className="text-gray-700">
                    You agree to defend, indemnify, and hold harmless README
                    Generator and its licensee and licensors, and their
                    employees, contractors, agents, officers and directors, from
                    and against any and all claims, damages, obligations,
                    losses, liabilities, costs or debt, and expenses (including
                    but not limited to attorney's fees).
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    11. Termination
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We may terminate or suspend your account and bar access to
                    the Service immediately, without prior notice or liability,
                    under our sole discretion, for any reason whatsoever
                    including but not limited to a breach of the Terms.
                  </p>
                  <p className="text-gray-700">
                    You may terminate your account at any time by contacting us
                    or using the account deletion feature in your user
                    dashboard.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    12. Governing Law
                  </h2>
                  <p className="text-gray-700">
                    These Terms shall be interpreted and governed by the laws of
                    [Your Jurisdiction], without regard to its conflict of law
                    provisions. Our failure to enforce any right or provision
                    will not be considered a waiver of those rights.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    13. Changes to Terms
                  </h2>
                  <p className="text-gray-700">
                    We reserve the right to modify or replace these Terms at any
                    time. If a revision is material, we will provide at least 30
                    days notice prior to any new terms taking effect.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    14. Severability
                  </h2>
                  <p className="text-gray-700">
                    If any provision of these Terms is held to be unenforceable
                    or invalid, such provision will be changed and interpreted
                    to accomplish the objectives of such provision to the
                    greatest extent possible under applicable law.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    15. Contact Information
                  </h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms & Conditions,
                    please contact us at:
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-700">
                      Email: atkola12345@gmail.com
                      <br />
                      Address: Durg C.G
                      <br />
                      Phone: 6263053724
                    </p>
                  </div>
                </section>

                <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> This is a template document. Please
                    consult with a qualified attorney to ensure these terms are
                    appropriate for your specific business and comply with
                    applicable laws in your jurisdiction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
