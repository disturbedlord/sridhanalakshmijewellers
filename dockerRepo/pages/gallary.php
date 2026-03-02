<?php $categories = [ ["name" =>
"Bangle", "image" => "/assets/images/bangle.png"], ["name" => "Ring", "image" =>
"/assets/images/ring.png"], ["name" => "Necklace", "image" =>
"/assets/images/necklus.png"], ["name" => "Stud", "image" =>
"/assets/images/stud.png"], ]; $products = [ ["image" =>
"/assets/images/ring.png" , "name" => "Ring"], ["image" =>
"/assets/images/ring.png", "name" => "Ring"], ["image" =>
"/assets/images/ring.png", "name" => "Ring"], ["image" =>
"/assets/images/ring.png", "name" => "Ring"], ["image" =>
"/assets/images/ring.png", "name" => "Ring"], ["image" =>
"/assets/images/ring.png", "name" => "Ring"], ["image" =>
"/assets/images/ring.png", "name" => "Ring"], ["image" =>
"/assets/images/ring.png", "name" => "Ring"], ]; ?>

<!doctype html>
<html lang="en">
  <head>
    <?php include "../includes/head.php" ?>
  </head>

  <body class="bg-[#f5f3ef] font-sans">
    <?php include "../includes/navbar.php" ?>
    <!-- Section Header -->
    <section class="py-16 text-center">
      <p class="text-orange-500 tracking-widest uppercase text-sm">
        Our Collection
      </p>
      <h2 class="text-4xl font-bold text-gray-800 mt-2">Jewellery Gallery</h2>
      <div class="w-20 h-1 bg-orange-400 mx-auto mt-4 rounded"></div>
    </section>

    <!-- Categories -->
    <section class="max-w-6xl mx-auto px-6 pb-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <?php foreach($categories as $cat): ?>
        <!-- Card -->
        <div class="group relative overflow-hidden rounded-2xl shadow-md">
          <img
            src="<?= BASE_URL .$cat['image'];?>"
            class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            alt=""
          />
          <div
            class="absolute inset-0 group-hover:bg-transparent bg-black/30 transition flex items-end"
          >
            <p class="text-white text-sm p-4 font-semibold">
              <?= $cat['name']; ?>
            </p>
          </div>
        </div>

        <?php endforeach; ?>
      </div>
    </section>
    <div class="w-20 mx-10 h-1 bg-orange-400 mx-auto mt-4 rounded"></div>

    <!-- Product Grid -->
    <section class="max-w-6xl mx-auto px-6 pb-20 mt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
      >
        <?php for ($i = 0; $i < count($products); $i++): ?>

        <div class="group relative overflow-hidden rounded-2xl shadow-md">
          <img
            src="<?= BASE_URL .$products[$i]['image']; ?>"
            class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            alt=""
          />
          <div
            class="absolute inset-0 group-hover:bg-transparent bg-black/30 transition flex items-end"
          >
            <p class="text-white text-sm p-4 font-semibold">
              <?= $products[$i]["name"]." $i"; ?>
            </p>
          </div>
        </div>
        <?php endfor; ?>
      </div>
    </section>
    <?php include "../includes/footer.php" ?>
  </body>
</html>
