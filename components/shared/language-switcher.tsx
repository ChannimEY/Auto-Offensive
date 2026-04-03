"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const [lang, setLang] = React.useState("en");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <Globe className="h-4 w-4 text-zinc-500" />
          <span className="font-medium uppercase">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-sans">
        <DropdownMenuItem onClick={() => setLang("en")} className="flex justify-between items-center">
          English
          {lang === "en" && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("kh")} className="flex justify-between items-center">
          ភាសាខ្មែរ
          {lang === "kh" && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}