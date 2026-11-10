import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

interface LoginPageProps {
  searchParams: Promise<{ error?: string; registered?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, registered } = await searchParams;

  return (
    <LoginForm
      initialError={error === "forbidden" ? "forbidden" : null}
      registered={registered === "1"}
    />
  );
}
