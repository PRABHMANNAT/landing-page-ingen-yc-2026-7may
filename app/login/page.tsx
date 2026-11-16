import AuthShell from "@/components/auth/AuthShell";

export const metadata = {
  title: "Log in — iNGen",
  description: "Find help accessing your invited iNGEN workspace.",
};

export default function LoginPage() {
  return <AuthShell mode="login" />;
}
