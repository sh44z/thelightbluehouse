// app/signup/page.js
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-cyan-500">Create an Account</h1>
        <SignupForm />
      </div>
    </div>
  );
}
