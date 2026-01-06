<template>
  <div class="offers-list">
    <div v-if="loading" class="loading">Chargement des offres...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="offers.length === 0" class="no-offers">Aucune offre trouvée avec ces critères.</div>

    <div v-else class="offers-grid">
      <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer" />
    </div>

    <!-- Pagination -->
    <div class="pagination-container">
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1" class="btn-page btn-nav">
          <span>← Précédent</span>
        </button>

        <div class="page-info">
          <div class="page-display">
            Page
            <strong>{{ currentPage }}</strong> sur
            <strong>{{ totalPages }}</strong>
          </div>
          <div
            class="total-info"
          >{{ (currentPage - 1) * limit + 1 }} - {{ Math.min(currentPage * limit, total) }} sur {{ total }} offres</div>
        </div>

        <button @click="nextPage" :disabled="currentPage === totalPages" class="btn-page btn-nav">
          <span>Suivant →</span>
        </button>
      </div>

      <div class="pagination-controls">
        <div class="items-per-page">
          <label for="itemsPerPage">Offres par page:</label>
          <select v-model.number="limit" id="itemsPerPage" @change="goToFirstPage">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>

        <div class="page-jumper">
          <label for="pageInput">Aller à la page:</label>
          <input
            id="pageInput"
            type="number"
            :value="currentPage"
            @change="jumpToPage"
            :min="1"
            :max="totalPages"
            class="page-input"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Offer, OfferFilters } from "../types/offer";
import { OfferService } from "../services/offerService";
import OfferCard from "./OfferCard.vue";
import { PAGINATION } from "../constants/app";

const props = defineProps<{
  filters: OfferFilters;
}>();

const emit = defineEmits<{
  "update:pagination": [page: number];
}>();

const offers = ref<Offer[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const currentPage = ref(1);
const totalPages = ref(1);
const total = ref(0);
const limit = ref(PAGINATION.defaultLimit);

const fetchOffers = async () => {
  loading.value = true;
  error.value = null;

  try {
    const result = await OfferService.getOffers({
      ...props.filters,
      page: currentPage.value,
      limit: limit.value,
    });

    offers.value = result.data;
    total.value = result.pagination.total;
    totalPages.value = result.pagination.totalPages;
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Une erreur est survenue";
    offers.value = [];
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToFirstPage = () => {
  currentPage.value = 1;
  fetchOffers();
};

const jumpToPage = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const page = parseInt(input.value);
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  fetchOffers();
});

watch(
  () => props.filters,
  () => {
    currentPage.value = 1;
    fetchOffers();
  },
  { deep: true }
);

watch(
  () => currentPage.value,
  () => {
    fetchOffers();
    emit("update:pagination", currentPage.value);
  }
);
</script>

<style scoped>
.offers-list {
  width: 100%;
}

.loading,
.error,
.no-offers {
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
  border-radius: 8px;
}

.loading {
  background-color: #e3f2fd;
  color: #1976d2;
}

.error {
  background-color: #ffebee;
  color: #c62828;
}

.no-offers {
  background-color: #f5f5f5;
  color: #666;
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

/* Pagination */
.pagination-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.btn-nav {
  font-weight: 600;
  padding: 10px 20px;
}

.page-info {
  text-align: center;
  min-width: 280px;
  background-color: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.page-display {
  font-size: 16px;
  color: #222;
  margin-bottom: 8px;
  font-weight: 600;
}

.page-display strong {
  color: #0066cc;
  font-size: 18px;
  font-weight: 700;
}

.total-info {
  font-size: 13px;
  color: #555;
  font-style: italic;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  flex-wrap: wrap;
}

.items-per-page,
.page-jumper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.items-per-page label,
.page-jumper label {
  font-weight: 600;
  color: #333;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.items-per-page select,
.page-input {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.items-per-page select {
  min-width: 80px;
}

.page-input {
  width: 70px;
  text-align: center;
  font-weight: 600;
}

.items-per-page select:hover,
.page-input:hover {
  border-color: #0066cc;
  background-color: #f8faff;
}

.items-per-page select:focus,
.page-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
  color: #333;
}

.btn-page {
  padding: 10px 18px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  color: #333;
}

.btn-page:hover:not(:disabled) {
  background-color: #0066cc;
  color: white;
  border-color: #0066cc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.2);
}

.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
