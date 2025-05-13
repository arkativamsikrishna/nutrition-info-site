async function getNutrition() {
  const food = document.getElementById('foodInput').value;
  const resultDiv = document.getElementById('result');

  if (!food) {
    resultDiv.innerHTML = "Please enter a food name.";
    return;
  }

  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(food)}&search_simple=1&action=process&json=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.products && data.products.length > 0) {
      const item = data.products[0];
      const nutrients = item.nutriments || {};
      resultDiv.innerHTML = `
        <strong>${item.product_name || 'Unknown Product'}</strong><br>
        Calories: ${nutrients['energy-kcal'] || 'N/A'} kcal<br>
        Protein: ${nutrients.proteins || 'N/A'} g<br>
        Fat: ${nutrients.fat || 'N/A'} g
      `;
    } else {
      resultDiv.innerHTML = "No data found.";
    }
  } catch (error) {
    resultDiv.innerHTML = "Error fetching data.";
  }
}