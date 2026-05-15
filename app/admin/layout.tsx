import AdminNav from "../components/ui/AdminNav";
import ToastNotification from "../components/ui/ToastNotification";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <AdminNav/>
        <div className="lg:min-h-screen container mx-auto w-full px-10 lg:px-0">
          <div className="bg-white shadow w-full mx-auto p-10 my-10" >
            {children}
          </div>
        </div>
        <ToastNotification />
    </>
  );
}