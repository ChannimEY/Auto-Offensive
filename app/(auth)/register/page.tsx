import Image from "next/image";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0F19] px-6 transition-colors duration-300">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side */}
        <div className="hidden md:flex flex-col items-start justify-center gap-6">
          
          {/* Light Logo */}
          <Image
            src="/Auto_offensive_Light-mode.png"
            alt="Auto Offensive Logo"
            width={208}
            height={208}
            className="w-52 object-contain dark:hidden"
          />

          {/* Dark Logo */}
          <Image
            src="/Auto_offensive_Dark-mode.png"
            alt="Auto Offensive Logo"
            width={208}
            height={208}
            className="w-52 object-contain hidden dark:block"
          />

          <Image
            src="/fox.png"
            alt="Auto Offensive Mascot"
            width={420}
            height={420}
            className="w-105 object-contain rounded-2xl"
          />
        </div>

        {/* Right Side */}
        <RegisterForm />
      </div>
    </div>
  );
}