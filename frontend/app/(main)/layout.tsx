import Nav from "@/components/Header/Nav";
import "../globals.css";
import Footer from "@/components/Footer/Footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        // Home page layout
        <section className="overflow-x-hidden">
            {/* <Navbar/> */}
            <Nav />
            <main>{children}</main>
            <Footer />
        </section>
    );
}
