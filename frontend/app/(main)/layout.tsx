import "../globals.css";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        // Home page layout
        <section className="overflow-x-hidden">
            {/* Navbar goes here */}
            <main>{children}</main>
            {/* Footer goes here */}
        </section>
    );
}