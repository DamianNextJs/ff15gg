import DeleteAccountModal from "@/features/profile-settings/components/DeleteAccountModal";

export default function AccountSettingsPage() {
  return (
    <div>
      <h2 className="text-red-400 font-medium text-2xl">Delete account</h2>
      <hr className="text-subtle/50 mt-3 mb-6" />
      <p className="text-subtle text-sm mb-3">
        If you delete your account, your build guides will remain, but you
        won&apos;t be able to edit them or create new ones. Your user data will
        be permanently removed from our database.
      </p>
      <DeleteAccountModal />
    </div>
  );
}
