<?php
include "rates-data.php";

if (isset($_POST['save'])) {

  $gold_18 = $_POST['gold_18'];
  $gold_22 = $_POST['gold_22'];
  $gold_24 = $_POST['gold_24'];
  $silver = $_POST['silver'];
  $last_updated = date("d-m-Y h:i A");

  $content = "<?php
\$gold_18 = $gold_18;
\$gold_22 = $gold_22;
\$gold_24 = $gold_24;
\$silver  = $silver;
\$last_updated = \"$last_updated\";
?>";

  file_put_contents("rates-data.php", $content);

  header("Location: rate.php");
  exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sridhanalakshi Jewellery</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>

  <header class="text-center py-6 bg-amber-700 text-white font-semibold text-2xl">Sridhanalakshi Jewellery</header>

  <main class="max-w-4xl mx-auto my-10 p-4">
    <form method="post" class="space-y-6">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="font-semibold mb-2">18 Carat Gold</div>
          <input class="w-full p-2 border rounded" type="number" name="gold_18" id="gold_18"
            value="<?php echo $gold_18; ?>" required>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <div class="font-semibold mb-2">22 Carat Gold</div>
          <input class="w-full p-2 border rounded" type="number" name="gold_22" value="<?php echo $gold_22; ?>"
            required>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <div class="font-semibold mb-2">24 Carat Gold</div>
          <input class="w-full p-2 border rounded" type="number" name="gold_24" value="<?php echo $gold_24; ?>"
            required>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <div class="font-semibold mb-2">Silver</div>
          <input class="w-full p-2 border rounded" type="number" name="silver" value="<?php echo $silver; ?>" required>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" name="save" class="px-6 py-3 bg-amber-700 text-white rounded">Update Rates</button>
      </div>

      <?php if ($last_updated != "") { ?>
        <div class="text-center text-green-600">Last updated: <?php echo $last_updated; ?></div>
      <?php } ?>

    </form>
  </main>

</body>

</html>