<script setup lang="ts">
import { ref } from "vue";
import OfferFilters from "./components/OfferFilters.vue";
import OffersList from "./components/OffersList.vue";
import type { OfferFilters as IOfferFilters } from "./types/offer";

const filters = ref<IOfferFilters>({
  nbDaysMin: undefined,
  nbDaysMax: undefined,
  retrocessionRateMin: undefined,
  retrocessionRateMax: undefined,
  averageTechnicalCareDayMin: undefined,
  averageTechnicalCareDayMax: undefined,
  averageKilometersDayMin: undefined,
  averageKilometersDayMax: undefined,
  averageConsultationsDayMin: undefined,
  averageConsultationsDayMax: undefined,
});

const applyFilters = (newFilters: IOfferFilters) => {
  filters.value = newFilters;
};

const updatePagination = (page: number) => {
  console.log("Page update:", page);
};
</script>

<template>
  <div id="app" class="app">
    <header class="header">
      <h1>Gestion des Offres de Travail</h1>
      <p>Consultez et filtrez les offres disponibles</p>
    </header>

    <main class="container">
      <OfferFilters :filters="filters" @apply="applyFilters" />
      <OffersList :filters="filters" @update:pagination="updatePagination" />
    </main>

    <footer class="footer">
      <p>&copy; 2026 Holidel - Tous droits réservés</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9f9f9;
}

#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

.header p {
  font-size: 16px;
  opacity: 0.9;
}

.container {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
  width: 100%;
}

.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 20px;
}

.footer p {
  margin: 0;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 24px;
  }

  .header p {
    font-size: 14px;
  }

  .container {
    padding: 20px 15px;
  }
}
</style>
