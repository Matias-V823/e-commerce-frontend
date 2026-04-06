import MainNav from "../ui/MainNav";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainNav />
      <main>{children}</main>
    </div>
  );
}
