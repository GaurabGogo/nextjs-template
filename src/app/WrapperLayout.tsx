import Header from "./Header";
import NavSidebar from "./NavSidebar";

export default function WrapperLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper-layout">
      <Header />
      <div className="wrapper-layout-inner">
        <NavSidebar />
        <main id="main-content">{children}</main>
      </div>
    </div>
  );
}
