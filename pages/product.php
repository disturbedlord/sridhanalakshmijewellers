<?php

$products = [
    [
        "name" =>
"Traditional Gold Necklace", "desc" => "Pure 22K handcrafted design", "price" =>
"58,000", "image" => "/assets/images/necklus.png", "badge" => "Trending" ], [
"name" => "Silver Couple Rings", "desc" => "Elegant modern finish", "price" =>
"3,500", "image" => "/assets/images/ring.png", "badge" => "New" ], [ "name" =>
"Gold Wedding Ring", "desc" => "Classic bridal collection", "price" => "25,000",
"image" => "/assets/images/ring.png", "badge" => "Bestseller" ], [ "name" =>
"Antique Gold Haram", "desc" => "Temple jewellery style", "price" => "95,000",
"image" => "/assets/images/necklus.png", "badge" => "Limited" ], ]; ?>
<head>
  <?php include "../includes/head.php" ?>
</head>
<body>
  <?php include "../includes/navbar.php" ?>

  <section class="bg-[#f5f3ef] py-20">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center gap-4 mb-16">
        <?php $filters = ["All", "Gold", "Silver", "Rings", "Necklace"];
        foreach($filters as $filter): ?>
        <button
          class="px-6 py-2 rounded-full border border-[#b77b57] text-[#b77b57] hover:bg-[#b77b57] hover:text-white transition duration-300"
        >
          <?= $filter ?>
        </button>
        <?php endforeach; ?>
      </div>

      <!-- Product Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <?php foreach($products as $product): ?>
        <div
          class="bg-white rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 overflow-hidden group"
        >
          <!-- Image -->
          <div class="relative bg-gray-50 p-8">
            <span
              class="z-10 absolute top-4 left-4 bg-[#b77b57] text-white text-xs px-3 py-1 rounded-full"
            >
              <?= $product['badge'] ?>
            </span>

            <img
              src="<?= BASE_URL . $product['image']; ?>"
              class="w-full h-56 object-contain"
            />
          </div>

          <!-- Content -->
          <div class="p-6 text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              <?= $product['name'] ?>
            </h3>

            <p class="text-gray-500 text-sm mb-3"><?= $product['desc'] ?></p>

            <p class="text-[#b77b57] font-bold text-lg mb-5">
              ₹<?= $product['price'] ?>
            </p>

            <div class="flex justify-center gap-3">
              <button
                class="px-5 py-2 rounded-full border border-[#b77b57] text-[#b77b57] hover:bg-[#b77b57] hover:text-white transition duration-300 text-sm"
              >
                View
              </button>

              <button
                class="px-5 py-2 rounded-full bg-[#b77b57] text-white hover:opacity-90 transition duration-300 text-sm"
              >
                Enquiry
              </button>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
  <?php include "../includes/footer.php" ?>
</body>
