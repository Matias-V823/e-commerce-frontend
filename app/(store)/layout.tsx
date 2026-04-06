import MainNav from "../ui/MainNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainNav/>
      <main className="lg:h-screen">
          <div className="md:flex-1 md:h-screen pt-10  pb-32 px-10">
              {children}
          </div> 
      </main>
    </>
  );
}