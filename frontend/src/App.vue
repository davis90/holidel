<script setup lang="ts">
import { ref } from "vue";
import OfferFilters from "./components/OfferFilters.vue";
import OffersList from "./components/OffersList.vue";
import ContractViewer from "./components/ContractViewer.vue";
import type { OfferFilters as IOfferFilters } from "./types/offer";

type Page = "offers" | "contract";

const currentPage = ref<Page>("offers");

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

const navigateTo = (page: Page) => {
  currentPage.value = page;
};
</script>

<template>
  <div id="app" class="app">
    <header class="header">
      <div class="header-content">
        <div class="header-title">
          <h1>Holidel</h1>
          <p>Plateforme de gestion des offres d'infirmiers</p>
        </div>
        <nav class="header-nav">
          <button
            :class="['nav-btn', { active: currentPage === 'offers' }]"
            @click="navigateTo('offers')"
          >Offres de Travail</button>
          <button
            :class="['nav-btn', { active: currentPage === 'contract' }]"
            @click="navigateTo('contract')"
          >Contrat de Remplacement</button>
        </nav>
      </div>
    </header>

    <main class="container">
      <!-- Page Offres -->
      <div v-if="currentPage === 'offers'" class="page-offers">
        <div class="page-header">
          <h2>Gestion des Offres de Travail</h2>
          <p>Consultez et filtrez les offres disponibles</p>
        </div>
        <OfferFilters :filters="filters" @apply="applyFilters" />
        <OffersList :filters="filters" @update:pagination="updatePagination" />
      </div>

      <!-- Page Contrat -->
      <div v-if="currentPage === 'contract'" class="page-contract">
        <ContractViewer />
      </div>
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
  padding: 30px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.header-title {
  text-align: center;
  flex: 1;
  min-width: 250px;
}

.header-title h1 {
  font-size: 32px;
  margin-bottom: 5px;
}

.header-title p {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

.header-nav {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 10px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background-color: transparent;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.nav-btn.active {
  background-color: white;
  color: #667eea;
  border-color: white;
}

.container {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
  width: 100%;
}

.page-offers,
.page-contract {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 16px;
  color: #666;
  margin: 0;
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
  .header-title h1 {
    font-size: 24px;
  }

  .header-title p {
    font-size: 12px;
  }

  .header-nav {
    width: 100%;
    justify-content: center;
  }

  .nav-btn {
    flex: 1;
    min-width: 140px;
  }

  .container {
    padding: 20px 15px;
  }

  .page-header h2 {
    font-size: 22px;
  }

  .page-header p {
    font-size: 14px;
  }
}
</style>
