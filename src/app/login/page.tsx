// app/login/page.js
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-cyan-500">Welcome Back</h1>
        <LoginForm />
      </div>
    </div>
  );
}
