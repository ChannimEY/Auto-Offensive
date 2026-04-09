import Home from "@/components/pages/homepage/home";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Auto-Offensive | Next-Gen PaaS for Hackers",
  description: "Automated Security Workflows and Pentesting Platform - Run 20+ professional security tools from your terminal with zero installation.",
  image: "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/668136974_122097842438777828_6950722614186409399_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFFh5MT6ytQqbaIX2RRZ2uGXHK3fEBv6tJccrd8QG_q0pvjaTlmyEuWUJDYE3VrrmClNwojEQNOMXsZ-H9Dfpc5&_nc_ohc=XZCNn0zcUlkQ7kNvwFOQpTO&_nc_oc=AdpsVnPxK9VjUTrX25GQrox83QpLY2lkGrY9FR9Cmi4nAAFFpa1tgnHDw7TDLHU5L6U&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=BiNMcC1yJmLwtNerQ27GEg&_nc_ss=7a3a8&oh=00_Af2OSBLd37iWi30fBf58fojh_8fqQCONV5nEvwkDFjjARw&oe=69DDC287",
  url: "/",
});

export default function HomePage() {
  return <Home />;
}