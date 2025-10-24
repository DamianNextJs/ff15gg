import ProfilePreferences from "@/features/profile-settings/components/ProfilePreferences";

export default function ProfileSettingsPage() {
  return (
    <div>
      <h2 className="font-medium text-2xl">Profile Preferences</h2>
      <hr className="text-subtle/50 mt-3 mb-6" />
      <ProfilePreferences />
    </div>
  );
}
