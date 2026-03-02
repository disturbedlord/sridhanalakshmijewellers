<!DOCTYPE html>
<html>

<head>
  <title>Jewellery Gallery</title>
  <style>
    * {
      box-sizing: border-box;
    }

    h2 {
      text-align: center;
      color: #c07c57;
      margin: 30px;
    }

    .categories {
      text-align: center;
      margin-bottom: 20px;
    }

    button {
      margin: 8px;
      padding: 10px 18px;
      border: none;
      background: #c07c57;
      color: white;
      border-radius: 20px;
      cursor: pointer;
    }

    .gallery {
      width: 90%;
      margin: auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    .gallery img {
      width: 100%;
      border-radius: 12px;
    }
  </style>
</head>

<body>

  <h2>Jewellery Gallery</h2>

  <div class="categories">
    <button onclick="show('bangle')">Bangle</button>
    <button onclick="show('ring')">Ring</button>
    <button onclick="show('necklace')">Necklace</button>
    <button onclick="show('stud')">Stud</button>
  </div>

  <div class="gallery" id="gallery"></div>

  <script>
    function show(category) {
      fetch("load-images.php?cat=" + category)
        .then(res => res.text())
        .then(data => document.getElementById("gallery").innerHTML = data);
    }
  </script>

</body>

</html>