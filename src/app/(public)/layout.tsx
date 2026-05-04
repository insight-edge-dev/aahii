import Breadcrumb from "@/components/layout/BreadCrumb";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PopupBanner from "@/components/PopupBanner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <main id="main-content">
        <PopupBanner />   
        {children}
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}
