import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div className="hidden md:flex flex-col items-start justify-center gap-6">
          <img
            src="/Auto_offensive_Light-mode.png"
            alt="Auto Offensive Logo"
            className="w-52 object-contain"
          />
          <img
            src="/fox.png"
            alt="Auto Offensive Mascot"
            className="w-[420px] object-contain rounded-2xl"
          />
        </div>

        {/* Right Side */}
        <RegisterForm />
      </div>
    </div>
  );
}
