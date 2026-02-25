<?php include $_SERVER['DOCUMENT_ROOT'] . '/config/config.php'; ?>
<?php $currentPage = basename($_SERVER['PHP_SELF']); ?>

<body>
  <nav
    id="navbar"
    class="bg-white px-4 sm:px-4 py-3 sm:py-2 flex items-center justify-between border-b sticky top-0 z-50"
  >
    <div id="brand" class="flex items-center gap-3">
      <img
        src="<?= BASE_URL ?>/assets/images/dlogo.jpeg"
        alt="logo"
        class="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-full"
      />
      <span class="text-lg sm:text-2xl font-bold text-amber-700"
        >SRI DHANALAKSHMI Jewellery</span
      >
    </div>

    <ul id="mainNav" class="hidden md:flex gap-6 items-center">
      <li class="relative">
        <div class="relative inline-block text-left">
          <!-- Button -->
          <button
            id="rateBtn"
            type="button"
            class="flex flex-row justify-between w-72 gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow border hover:bg-gray-50"
          >
            <div class="flex flex-row gap-2">
              <img
                src="<?= BASE_URL ?>/assets/images/goldcoin.png"
                class="h-5 w-5"
              />
              GOLD 22 KT/1g - ₹ 14830
            </div>
            <svg
              class="h-4 w-4 ml-1"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Dropdown -->
          <div
            id="rateMenu"
            class="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg border hidden"
          >
            <ul class="py-2 text-sm text-gray-700">
              <li
                class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src="<?= BASE_URL ?>/assets/images/goldcoin.png"
                  class="h-5 w-5"
                />
                <span class="flex-1 font-medium text-red-700"
                  >GOLD 24 KT/1g</span
                >
                <span class="font-semibold text-red-700">₹ 16190</span>
              </li>

              <li
                class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src="<?= BASE_URL ?>/assets/images/goldcoin.png"
                  class="h-5 w-5"
                />
                <span class="flex-1 font-medium text-red-700"
                  >GOLD 22 KT/1g</span
                >
                <span class="font-semibold text-red-700">₹ 14830</span>
              </li>

              <li
                class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src="<?= BASE_URL ?>/assets/images/goldcoin.png"
                  class="h-5 w-5"
                />
                <span class="flex-1 font-medium text-red-700"
                  >GOLD 18 KT/1g</span
                >
                <span class="font-semibold text-red-700">₹ 12142</span>
              </li>

              <li
                class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src="<?= BASE_URL ?>/assets/images/goldcoin.png"
                  class="h-5 w-5"
                />
                <span class="flex-1 font-medium text-red-700"
                  >GOLD 14 KT/1g</span
                >
                <span class="font-semibold text-red-700">₹ 9444</span>
              </li>

              <li
                class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src="<?= BASE_URL ?>/assets/images/silvercoin.png"
                  class="h-5 w-5"
                />
                <span class="flex-1 font-medium text-gray-700"
                  >PLATINUM 1g</span
                >
                <span class="font-semibold">₹ 7631</span>
              </li>

              <li
                class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src="<?= BASE_URL ?>/assets/images/silvercoin.png"
                  class="h-5 w-5"
                />
                <span class="flex-1 font-medium text-gray-700">SILVER 1g</span>
                <span class="font-semibold">₹ 290</span>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <div class="xl:block hidden">
        <div class="flex flex-row gap-4">
          <li>
            <a
              href="<?=($currentPage === 'index.php') ? '#home' : '../index.php' ?>"
              class="hover:text-orange-500 transition"
              >Home</a
            >
          </li>
          <?php if ($currentPage === 'index.php'): ?>

          <li>
            <a href="#shop" class="hover:text-orange-500 transition">Shop</a>
          </li>
          <li>
            <a
              href="./pages/about us.php"
              class="hover:text-orange-500 transition"
              >About Us</a
            >
          </li>

          <li>
            <a href="#gallery" class="hover:text-orange-500 transition"
              >Gallery</a
            >
          </li>
          <li>
            <a href="#whyus" class="hover:text-orange-500 transition">Why Us</a>
          </li>
          <li>
            <a href="#contactus" class="hover:text-orange-500 transition"
              >Contact</a
            >
          </li>
          <?php endif; ?>
        </div>
      </div>
    </ul>

    <div class="block xl:hidden">
      <button id="menuToggle" class="text-2xl">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </nav>

  <!-- Mobile nav (rendered when toggled) -->
  <div id="mobileNav" class="block xl:hidden">
    <ul id="mobileList" class="hidden bg-white p-4 space-y-3">
      <li>
        <a
          href="<?=($currentPage === 'index.php') ? '#home' : '../index.php' ?>"
          class="block"
          >Home</a
        >
      </li>
      <?php if ($currentPage === 'index.php'): ?>
      <li><a href="#shop" class="block">Shop</a></li>
      <li><a href="#gallery" class="block">Gallery</a></li>
      <li><a href="pages/about us.php" class="block">About Us</a></li>
      <li><a href="#whyus" class="block">Why Us</a></li>
      <li><a href="#contactus" class="block">Contact</a></li>
      <?php endif; ?>
    </ul>
  </div>
</body>
<script>
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileList = document.getElementById("mobileList");

  menuToggle?.addEventListener("click", () => {
    mobileList.classList.toggle("hidden");
  });

  const hamburger = document.getElementById("menuToggle");

  window.addEventListener("scroll", function () {
    if (window.scrollY <= 10) {
      hamburger.classList.remove("opacity-0");
      hamburger.classList.add("opacity-100");
    } else {
      hamburger.classList.remove("opacity-100");
      hamburger.classList.add("opacity-0");
    }
  });
</script>
