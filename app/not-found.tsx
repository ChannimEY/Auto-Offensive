import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("error.notFound");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-zinc-950 to-zinc-900 px-4">
      <div className="text-center space-y-8">
        <div className="relative">
          <h1 className="text-[200px] font-bold text-zinc-800 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center">
              <span className="text-4xl">🔒</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-zinc-100">
            {t("title")}
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t("goHome")}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("goBack")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}