import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Interventionist = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
              Meet Your Interventionist
            </h1>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Learn more about our certified intervention professionals and their approach to helping families.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Interventionist;
