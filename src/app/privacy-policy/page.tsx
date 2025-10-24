import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains what
        information we collect, how we use it, and your rights regarding your
        data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        When you log in using Google, we collect your Google account
        information: name, email, and profile image. This data is stored in our
        database to identify your account and provide personalized features.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. Summoner Account Information
      </h2>
      <p className="mb-4">
        Users can optionally bind a Summoner account (League of Legends profile)
        to their account. We do <strong>not</strong> collect any new Summoner
        data — all Summoner profiles are publicly accessible and already stored
        in our database. Binding simply associates an existing profile with your
        account for convenience, for example to display your chosen appearance
        or reference in build guides.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Preferences</h2>
      <p className="mb-4">
        We store user preferences such as which appearance to display (Google
        profile or Summoner profile). This information is used solely to
        customize your experience in the app.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Account Deletion</h2>
      <p className="mb-4">
        You can delete your account at any time from your profile settings.
        Deleting your account will permanently remove your personal data from
        our database. Any content you created, such as build guides, will remain
        but you will no longer be able to edit or create new ones.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        5. No Tracking or Analytics
      </h2>
      <p className="mb-4">
        We do not use tracking, analytics, or third-party cookies to collect
        information about your activity. Your data remains private and is only
        used to provide the features you interact with directly.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Contact</h2>
      <p className="mb-4">
        If you have any questions regarding this Privacy Policy, you can contact
        us at{" "}
        <Link
          href="mailto:ff15ggcontact@gmail.com"
          className="underline text-primary"
        >
          ff15ggContact@gmail.com
        </Link>
        .
      </p>

      <p className="text-sm text-subtle mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
