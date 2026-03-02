<?php include $_SERVER['DOCUMENT_ROOT'] . '/config/config.php'; ?>
<?php $currentPage = basename($_SERVER['PHP_SELF']);
if ($currentPage === 'index.php') 
{include "db/db.php";}
else {include "../db/db.php";} 



$sql = "SELECT * FROM RATES";
$result = $conn->query($sql);
$ratesData;
if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
        $ratesData = $row;
    }

} else {
    echo "No records found";
}
$conn->close();

?>
  <?php
// Example rates array from backend
$rates = [
    ["name" => "GOLD 24 KT/1g", "price" => $ratesData["gold_24k"], "icon" => "/assets/images/goldcoin.png"],
    ["name" => "GOLD 22 KT/1g", "price" => $ratesData["gold_22k"], "icon" => "/assets/images/goldcoin.png"],
    ["name" => "GOLD 18 KT/1g", "price" => $ratesData["gold_18k"], "icon" => "/assets/images/goldcoin.png"],
    ["name" => "SILVER 1g", "price" => $ratesData["silver"], "icon" => "/assets/images/silvercoin.png"],
];
?>
<body>


<!-- Container -->
<div class="sm:hidden block bg-[#FEF7F7] w-full pl-2 relative inline-block text-left mx-auto">
    <!-- Button -->
    <button id="rateDropdownButton" type="button" class="inline-flex justify-between items-center px-4 py-1 bg-[#FEF7F7]  text-gray-800 font-semibold rounded-md hover:bg-gray-50 focus:outline-none" aria-expanded="true">
        <div class="flex items-center space-x-2 text-[#681016] bg-[#FEF7F7] ">
            <img src="<?= $rates[0]['icon'] ?>" class="h-5 w-5" alt="Metal Icon">
            <span><?= $rates[0]["name"] ?> - ₹<?= number_format($rates[0]['price']) ?></span>
        </div>
        <svg id="rateDropdownIcon" class="ml-2 h-4 w-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    </button>

    <!-- Dropdown menu -->
    <div id="rateDropdownMenu" class="z-50 hidden absolute mt-2  bg-white border shadow-lg rounded-md z-50">
        <ul class="divide-y divide-gray-100 ">
            <?php foreach ($rates as $rate): ?>
            <li>
                <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 ">
                    <img src="<?= $rate['icon'] ?>" class="h-5 w-5 mr-2" alt="Icon">
                    <span class=" text-[#681016]"><?= $rate['name'] ?> - ₹<?= number_format($rate['price']) ?></span>
                </a>
            </li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>

  <nav
    id="navbar"
    class="bg-white px-4 sm:px-4 py-3 sm:py-2 flex items-center justify-between border-b sticky top-0 z-10"
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
              <?= $rates[0]["name"] ?> - <?= $rates[0]["price"]?>
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
              <?php foreach ($rates as $rate): ?>
              <li
                class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src="<?=  $rate['icon']?>"
                  class="h-5 w-5"
                />
                <span class="flex-1 font-medium text-red-700"
                  ><?=$rate['name'] ?></span
                >
                <span class="font-semibold text-red-700">₹ <?=$rate['price'] ?></span>
              </li>
              <?php endforeach; ?>
              
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
  const button = document.getElementById('rateDropdownButton');
const menu1 = document.getElementById('rateDropdownMenu');
const icon = document.getElementById('rateDropdownIcon');

button.addEventListener('click', () => {
    menu1.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
});

// Optional: close dropdown if clicked outside
document.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !menu1.contains(e.target)) {
        menu1.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
});
</script>
