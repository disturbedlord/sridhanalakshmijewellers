<!DOCTYPE html>
<html lang="en">
  <?php include "includes/head.php"; ?>

  <body class="font-sans text-gray-900 bg-white">
    <html class="scroll-smooth">
    <!-- Navigation -->
    
    <?php include "includes/navbar.php"; ?>




    <!-- Slider -->
    <section id="home"  class="scroll-mt-24 relative overflow-hidden">
      <div class="slide active relative">
        <img
          src="assets/images/1.jpg"
          class="w-full h-auto object-cover"
          alt=""
        />
      </div>

      <div class="slide hidden relative">
        <img src="assets/images/2.jpg" class="w-full h-auto object-cover" />
      </div>
      <div class="slide hidden relative">
        <img src="assets/images/s2.png" class="w-full h-auto object-cover" />
      </div>
      <!-- Dots -->
      <div
        class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"
        id="dots"
      >
        <button class="dot w-3 h-3 rounded-full bg-white/50"></button>
        <button class="dot w-3 h-3 rounded-full bg-white/50"></button>
        <button class="dot w-3 h-3 rounded-full bg-white/50"></button>
      </div>
    </section>

    <!-- Shop -->
    <section id="shop" class=" scroll-mt-20  bg-[#FFF6EC] py-14">
      <div class="max-w-5xl mx-auto px-4">
        <!-- Heading -->
        <div class="text-center mb-12">
          <p class="text-orange-500 tracking-widest text-sm uppercase">
            Shop By
          </p>
          <h2 class="text-3xl md:text-4xl font-semibold mt-2 text-gray-800">
            Categories
          </h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto">
            Crafted with purity, precision and honestry
          </p>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <!-- Gold Card -->
          <div
            class="group bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div
              class="w-28 h-28 mx-auto flex items-center justify-center rounded-full bg-orange-50 group-hover:scale-105 transition"
            >
              <img
                src="assets/images/gold.png"
                alt="Gold"
                class="w-20 h-20 object-contain"
              />
            </div>

            <h3 class="mt-6 text-lg font-semibold text-orange-700">Gold</h3>

            <p class="mt-1 text-sm text-gray-500">Explore gold jewellery</p>
          </div>

          <!-- Silver Card -->
          <div
            class="group bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div
              class="w-28 h-28 mx-auto flex items-center justify-center rounded-full bg-gray-100 group-hover:scale-105 transition"
            >
              <img
                src="assets/images/silver.png"
                alt="Silver"
                class="w-20 h-20 object-contain"
              />
            </div>

            <h3 class="mt-6 text-lg font-semibold text-gray-700">Silver</h3>

            <p class="mt-1 text-sm text-gray-500">Elegant silver designs</p>
          </div>
        </div>
      </div>
    </section>

    <section id="gallery" class="scroll-mt-24 bg-white py-16">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Heading -->
        <div class="text-center mb-12">
          <span class="text-orange-500 tracking-widest text-sm uppercase">
            Our Collection
          </span>
          <h2 class="text-3xl md:text-4xl font-semibold mt-2">Gallery</h2>
          <div class="w-20 h-1 bg-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- Gallery Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Card -->
                     <a href="<?= BASE_URL ?>/pages/product.php" >

          <div class="group relative overflow-hidden rounded-2xl shadow-md">
            <img
              src="assets/images/bangle.png"
              class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              alt=""
            />
            <div
              class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end"
            >
              <p class="text-white text-sm p-4">Gold Bangles</p>
            </div>
          </div>
        </a>
          <a href="<?= BASE_URL ?>/pages/product.php" >

          <div class="group relative overflow-hidden rounded-2xl shadow-md">
            <img
              src="assets/images/necklus.png"
              class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              alt=""
            />
            <div
              class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-end transition"
            >
              <p class="text-white text-sm p-4">Necklace Set</p>
            </div>
          </div>
        </a>
          <a href="<?= BASE_URL ?>/pages/product.php" >

          <div
            class="group relative overflow-hidden rounded-2xl shadow-md bg-white"
          >
            <img
              src="assets/images/ring.png"
              class="w-full h-80 object-contain p-6 transition-transform duration-500 group-hover:scale-110"
              alt=""
            />
            <div
              class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-end transition"
            >
              <p class="text-white text-sm p-4">Diamond Ring</p>
            </div>
          </div></a>
          <a href="<?= BASE_URL ?>/pages/product.php" >
          <div class="group relative overflow-hidden rounded-2xl shadow-md">

            <img
              src="assets/images/stud.png"
              class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              alt=""
            />
            <div
              class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-end transition"
            >
              <p class="text-white text-sm p-4">Traditional Earrings</p>
            </div>
          </div> </a>
        </div>
      </div>
      <!-- Explore Collection Button -->
<div class="text-center mt-16">
    <a href="<?= BASE_URL ?>/pages/product.php"
       class="inline-block px-10 py-3 rounded-full 
              bg-[#b77b57] text-white text-sm tracking-wide
              hover:bg-[#a06a49] transition duration-300 
              shadow-md hover:shadow-lg">
        Explore Collection
    </a>
</div>
    </section>

    <section id="whyus" class="scroll-mt-24 bg-[#fff8f1] py-16">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Heading -->
        <div class="text-center mb-12">
          <p class="text-orange-500 tracking-widest text-sm uppercase">
            Why Choose Us
          </p>
          <h2 class="text-3xl md:text-4xl font-semibold mt-2 text-gray-800">
            Jewellery You Can Trust
          </h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto">
            Crafted with purity, precision, and care to celebrate your moments.
          </p>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card -->
          <div
            class="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition group"
          >
            <div
              class="w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6"
            >
              <img src="assets/images/collections.png" class="w-full" alt="" />
            </div>
            <h3 class="text-lg font-semibold mb-2">Curated Collection</h3>
            <p class="text-gray-500 text-sm">
              Handpicked designs for daily wear, festivals, and weddings.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition group"
          >
            <div
              class="w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6"
            >
              <img src="assets/images/certified.png" class="w-full" alt="" />
            </div>
            <h3 class="text-lg font-semibold mb-2">100% Certified Purity</h3>
            <p class="text-gray-500 text-sm">
              Hallmarked gold & silver with guaranteed authenticity.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition group"
          >
            <div
              class="w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6"
            >
              <img src="assets/images/shipping.png" class="w-full" alt="" />
            </div>
            <h3 class="text-lg font-semibold mb-2">Free & Secure Shipping</h3>
            <p class="text-gray-500 text-sm">
              Free delivery above ₹200 with safe and insured packaging.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#ffff] py-16">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Heading -->
        <div class="text-center mb-12">
          <p class="text-orange-500 tracking-widest text-sm uppercase">
            Testimonials
          </p>
          <h2 class="text-3xl md:text-4xl font-semibold mt-2 text-gray-800">
            What Our Customers Say
          </h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto">
            Trusted by customers who value purity, craftsmanship, and service.
          </p>
        </div>

        <!-- Testimonials -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Testimonial Card -->
          <div
            class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
          >
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center"
              >
                <span class="text-orange-600 font-semibold">A</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Anita R.</h4>
                <p class="text-sm text-gray-500">Chennai</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">
              “Absolutely stunning craftsmanship. The gold quality and detailing
              exceeded my expectations. Perfect for special occasions.”
            </p>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
          >
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center"
              >
                <span class="text-orange-600 font-semibold">R</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Rahul K.</h4>
                <p class="text-sm text-gray-500">Bangalore</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">
              “Pure gold, honest pricing, and certified quality. I felt
              confident purchasing here and will definitely return.”
            </p>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
          >
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center"
              >
                <span class="text-orange-600 font-semibold">S</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Sneha M.</h4>
                <p class="text-sm text-gray-500">Coimbatore</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">
              “Safe delivery, beautiful packaging, and amazing support. The
              entire experience felt premium.”
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="watch" class="scroll-mt-24 bg-[#fff8f1] py-20">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Heading -->
        <div class="text-center mb-14">
          <p class="text-orange-500 tracking-widest text-sm uppercase">
            Watch & Feel
          </p>
          <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mt-2">
            Watch Our Jewellery
          </h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto">
            Experience the craftsmanship, shine, and elegance through our
            exclusive videos.
          </p>
        </div>

        <!-- Videos -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <!-- Gold Video -->
          <div class="group">
            <div
              class="relative rounded-2xl overflow-hidden shadow-lg bg-black"
            >
              <video
                class="w-full h-[280px] object-cover"
                controls
                preload="metadata"
              >
                <source src="assets/videos/v1.mp4" type="video/mp4" />
              </video>
            </div>
            <h3 class="text-center mt-4 text-lg font-semibold text-gray-800">
              Gold Jewellery
            </h3>
            <p class="text-center text-sm text-gray-500">
              Traditional & modern designs in pure gold
            </p>
          </div>

          <!-- Silver Video -->
          <div class="group">
            <div
              class="relative rounded-2xl overflow-hidden shadow-lg bg-black"
            >
              <video
                class="w-full h-[280px] object-cover"
                controls
                preload="metadata"
              >
                <source src="assets/videos/v2.mp4" type="video/mp4" />
              </video>
            </div>
            <h3 class="text-center mt-4 text-lg font-semibold text-gray-800">
              Silver Jewellery
            </h3>
            <p class="text-center text-sm text-gray-500">
              Elegant silver crafted for everyday beauty
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="contactus" class="scroll-mt-24 bg-[#ffff] py-20">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Heading -->
        <div class="text-center mb-14">
          <p class="text-orange-500 tracking-widest text-sm uppercase">
            Get In Touch
          </p>
          <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mt-2">
            Contact Us
          </h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto">
            Have a question about our jewellery or custom designs? We’re happy
            to help.
          </p>
        </div>

        <!-- Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          <!-- Contact Form -->
          <div class="bg-white rounded-2xl p-8">
            <form class="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              ></textarea>

              <button
                type="submit"
                class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <!-- Map + Info -->
          <div class="bg-white rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=SRI%20DHANALAKSHMI%20Jewellery%20%2C%20arcot&output=embed"
              class="w-full h-full min-h-[420px] border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <?php include "includes/footer.php" ?>

    <script>
      
      const btn = document.getElementById("rateBtn");
      const menu = document.getElementById("rateMenu");

      btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
      });

      document.addEventListener("click", (e) => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
          menu.classList.add("hidden");
        }
      });

      // Slider
      let slideIndex = 0;
      const slides = document.querySelectorAll(".slide");
      const dots = document.querySelectorAll(".dot");

      let current = 0;

      function showSlide(index) {
        slides.forEach((s) => s.classList.remove("active"));

        slides.forEach((slide, i) => {
          slide.classList.toggle("hidden", i !== index);
        });
        slides[index].classList.add("active");

        dots.forEach((dot, i) => {
          dot.classList.toggle("bg-white", i === index);
          dot.classList.toggle("bg-white/50", i !== index);
        });

        current = index;
      }

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => showSlide(index));
      });

      // Initial state
      showSlide(0);

      // Auto slide (optional)
      setInterval(() => {
        showSlide((current + 1) % slides.length);
      }, 3000);
    </script>
  </body>
</html>
