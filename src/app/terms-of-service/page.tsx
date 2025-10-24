import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>

      <p className="mb-4">
        Welcome to FF15GG! By using our website and services, you agree to these
        Terms of Service. Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing or using FF15GG, you agree to be bound by these terms. If
        you do not agree, please do not use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. Use of Our Services
      </h2>
      <p className="mb-4">
        You agree to use FF15GG responsibly and only for lawful purposes. You
        are responsible for maintaining the confidentiality of your account
        information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Content</h2>
      <p className="mb-4">
        Any content you provide or share on FF15GG must comply with applicable
        laws and not violate the rights of others. We reserve the right to
        remove content that violates these terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Privacy</h2>
      <p className="mb-4">
        Our{" "}
        <Link href="/privacy-policy" className="underline text-primary">
          Privacy Policy
        </Link>{" "}
        explains how we collect and use your information. By using our services,
        you consent to the practices described there.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        5. Limitation of Liability
      </h2>
      <p className="mb-4">
        FF15GG provides services &quot;as is&quot; and we cannot guarantee
        uninterrupted access or error-free operation. We are not liable for any
        damages arising from your use of our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms of Service from time to time. Any changes will
        be posted on this page. Your continued use of FF15GG constitutes
        acceptance of the updated terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact</h2>
      <p className="mb-4">
        If you have any questions regarding these Terms, you can contact us at{" "}
        <Link
          href="mailto:ff15ggcontact@gmail.com"
          className="underline text-primary"
        >
          ff15ggcontact@gmail.com
        </Link>
        .
      </p>

      <p className="text-sm text-subtle mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
