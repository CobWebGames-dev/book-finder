const AMAZON_BASE_URL = "https://www.amazon.com/s";
const LOW_PRICE_SORT = "price-asc-rank";

const form = document.querySelector("#bookSearchForm");
const queryInput = document.querySelector("#bookQuery");
const formatSelect = document.querySelector("#bookFormat");
const formStatus = document.querySelector("#formStatus");
const promptButtons = document.querySelectorAll("[data-search]");

function buildAmazonSearchUrl(query, format) {
  const params = new URLSearchParams({
    k: query.trim(),
    i: format,
    s: LOW_PRICE_SORT,
  });

  return `${AMAZON_BASE_URL}?${params.toString()}`;
}

function redirectToAmazonBestPrice(query, format = formatSelect.value) {
  const cleanedQuery = query.trim();

  if (!cleanedQuery) {
    formStatus.textContent = "Add a specific book title, author, or ISBN.";
    queryInput.focus();
    return;
  }

  const url = buildAmazonSearchUrl(cleanedQuery, format);
  formStatus.textContent = `Redirecting to Amazon low-price results for "${cleanedQuery}".`;
  window.location.assign(url);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  redirectToAmazonBestPrice(queryInput.value);
});

promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const query = button.dataset.search || "";
    queryInput.value = query;
    redirectToAmazonBestPrice(query);
  });
});
