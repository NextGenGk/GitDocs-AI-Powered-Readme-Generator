import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - README Generator</title>
        <meta
          name="description"
          content="Privacy Policy for README Generator application"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8 sm:px-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Privacy Policy
                </h1>
                <p className="text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    1. Introduction
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Welcome to README Generator ("we," "our," or "us"). This
                    Privacy Policy explains how we collect, use, disclose, and
                    safeguard your information when you use our README
                    generation application and related services (the "Service").
                  </p>
                  <p className="text-gray-700">
                    By using our Service, you agree to the collection and use of
                    information in accordance with this Privacy Policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    2. Information We Collect
                  </h2>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    2.1 Information You Provide
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>
                      Project information (name, description, technologies used)
                    </li>
                    <li>Repository details and documentation content</li>
                    <li>Contact information (if provided)</li>
                    <li>
                      Any other information you choose to input into our Service
                    </li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    2.2 Automatically Collected Information
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Usage data and analytics</li>
                    <li>Device information (browser type, operating system)</li>
                    <li>IP address and location data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We use the collected information for:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>
                      Generating README files based on your project information
                    </li>
                    <li>Improving and personalizing our Service</li>
                    <li>
                      Providing customer support and responding to inquiries
                    </li>
                    <li>Analyzing usage patterns to enhance user experience</li>
                    <li>Ensuring security and preventing fraud</li>
                    <li>Complying with legal obligations</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    4. Information Sharing and Disclosure
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties, except in the following
                    circumstances:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations or court orders</li>
                    <li>To protect our rights, property, or safety</li>
                    <li>
                      In connection with a merger, acquisition, or sale of
                      assets
                    </li>
                    <li>
                      With trusted service providers who assist in operating our
                      Service
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    5. Data Security
                  </h2>
                  <p className="text-gray-700">
                    We implement appropriate technical and organizational
                    security measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or
                    destruction. However, no method of transmission over the
                    internet or electronic storage is 100% secure.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    6. Data Retention
                  </h2>
                  <p className="text-gray-700">
                    We retain your personal information only for as long as
                    necessary to fulfill the purposes outlined in this Privacy
                    Policy, comply with legal obligations, resolve disputes, and
                    enforce our agreements.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    7. Your Rights
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Depending on your location, you may have the following
                    rights:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Access to your personal information</li>
                    <li>Correction of inaccurate data</li>
                    <li>Deletion of your personal information</li>
                    <li>Restriction of processing</li>
                    <li>Data portability</li>
                    <li>Objection to processing</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    8. Cookies and Tracking
                  </h2>
                  <p className="text-gray-700">
                    We use cookies and similar tracking technologies to enhance
                    your experience, analyze usage, and provide personalized
                    content. You can control cookie preferences through your
                    browser settings.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    9. Children's Privacy
                  </h2>
                  <p className="text-gray-700">
                    Our Service is not intended for children under 13 years of
                    age. We do not knowingly collect personal information from
                    children under 13. If we become aware of such data
                    collection, we will take steps to delete it promptly.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    10. International Data Transfers
                  </h2>
                  <p className="text-gray-700">
                    Your information may be transferred to and processed in
                    countries other than your own. We ensure appropriate
                    safeguards are in place to protect your personal information
                    in accordance with applicable data protection laws.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    11. Changes to This Privacy Policy
                  </h2>
                  <p className="text-gray-700">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    12. Contact Us
                  </h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-700">
                      Email: atkola@gmail.com
                      <br />
                      Address: Durg C.G <br />
                      Phone: +91 6263053724
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
