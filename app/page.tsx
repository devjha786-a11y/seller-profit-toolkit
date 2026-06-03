export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-center">
          Seller Profit Toolkit
        </h1>

        <p className="text-center text-gray-600 mt-6 text-xl">
          Free calculators and tools for Etsy, Amazon and Shopify sellers.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl">
              Etsy Fee Calculator
            </h2>
            <p className="mt-2 text-gray-600">
              Calculate Etsy fees instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl">
              Etsy Profit Calculator
            </h2>
            <p className="mt-2 text-gray-600">
              Know your actual profit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl">
              Etsy Pricing Calculator
            </h2>
            <p className="mt-2 text-gray-600">
              Set the right selling price.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}