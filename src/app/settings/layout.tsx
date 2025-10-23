import ProfileSettingsLinks from "@/features/profile-settings/components/ProfileSettingsLinks";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile Settings",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex flex-col lg:flex-row lg:justify-center pt-10 px-4 gap-4 lg:gap-16">
      <ProfileSettingsLinks />
      <div className="lg:w-140">{children}</div>
    </div>
  );
}
