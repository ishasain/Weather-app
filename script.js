const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  const apiKey = "8b461eeb11bb457ea4d123624250210";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    resultDiv.innerHTML = "<p>Loading...</p>";
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    
    const data = await response.json();
    resultDiv.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="weather icon">
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
  }
});
