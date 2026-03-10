import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";
import FooterBrandingBar from "./FooterBrandingBar";

export default function Footer() {
  return (
    <>
      <footer className="mt-16">
      <FooterBrandingBar />
      <FooterTop />
      <FooterBottom />
    </footer>
    </>
  );
}
