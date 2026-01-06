<template>
  <div class="filters-container">
    <h2>Filtrer les offres</h2>
    <div class="filters-grid">
      <!-- Nombre de jours -->
      <div class="filter-group">
        <label for="nbDaysMin">Jours minimum:</label>
        <input
          id="nbDaysMin"
          v-model.number="localFilters.nbDaysMin"
          type="number"
          placeholder="Min"
          min="0"
        />
      </div>

      <div class="filter-group">
        <label for="nbDaysMax">Jours maximum:</label>
        <input
          id="nbDaysMax"
          v-model.number="localFilters.nbDaysMax"
          type="number"
          placeholder="Max"
          min="0"
        />
      </div>

      <!-- Taux de rétrocession -->
      <div class="filter-group">
        <label for="retrocessionRateMin">Taux rétrocession min (%):</label>
        <input
          id="retrocessionRateMin"
          v-model.number="localFilters.retrocessionRateMin"
          type="number"
          placeholder="Min"
          min="0"
          max="100"
        />
      </div>

      <div class="filter-group">
        <label for="retrocessionRateMax">Taux rétrocession max (%):</label>
        <input
          id="retrocessionRateMax"
          v-model.number="localFilters.retrocessionRateMax"
          type="number"
          placeholder="Max"
          min="0"
          max="100"
        />
      </div>

      <!-- Soins techniques moyens par jour -->
      <div class="filter-group">
        <label for="techCareMin">Soins techniques min:</label>
        <input
          id="techCareMin"
          v-model.number="localFilters.averageTechnicalCareDayMin"
          type="number"
          placeholder="Min"
          min="0"
        />
      </div>

      <div class="filter-group">
        <label for="techCareMax">Soins techniques max:</label>
        <input
          id="techCareMax"
          v-model.number="localFilters.averageTechnicalCareDayMax"
          type="number"
          placeholder="Max"
          min="0"
        />
      </div>

      <!-- Kilomètres moyens par jour -->
      <div class="filter-group">
        <label for="kmMin">Kilomètres min:</label>
        <input
          id="kmMin"
          v-model.number="localFilters.averageKilometersDayMin"
          type="number"
          placeholder="Min"
          min="0"
        />
      </div>

      <div class="filter-group">
        <label for="kmMax">Kilomètres max:</label>
        <input
          id="kmMax"
          v-model.number="localFilters.averageKilometersDayMax"
          type="number"
          placeholder="Max"
          min="0"
        />
      </div>

      <!-- Consultations moyennes par jour -->
      <div class="filter-group">
        <label for="consultMin">Consultations min:</label>
        <input
          id="consultMin"
          v-model.number="localFilters.averageConsultationsDayMin"
          type="number"
          placeholder="Min"
          min="0"
        />
      </div>

      <div class="filter-group">
        <label for="consultMax">Consultations max:</label>
        <input
          id="consultMax"
          v-model.number="localFilters.averageConsultationsDayMax"
          type="number"
          placeholder="Max"
          min="0"
        />
      </div>

      <!-- Départements -->
      <div class="filter-group filter-group-full">
        <label>Départements autorisés:</label>
        <ChipInput v-model="localFilters.departments" />
      </div>
    </div>

    <div class="filter-actions">
      <button @click="applyFilters" class="btn-apply">Appliquer les filtres</button>
      <button @click="resetFilters" class="btn-reset">Réinitialiser</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { OfferFilters } from "../types/offer";
import ChipInput from "./ChipInput.vue";

const props = defineProps<{
  filters: OfferFilters;
}>();

const emit = defineEmits<{
  apply: [filters: OfferFilters];
}>();

const localFilters = ref<OfferFilters>({
  nbDaysMin: props.filters.nbDaysMin,
  nbDaysMax: props.filters.nbDaysMax,
  retrocessionRateMin: props.filters.retrocessionRateMin,
  retrocessionRateMax: props.filters.retrocessionRateMax,
  averageTechnicalCareDayMin: props.filters.averageTechnicalCareDayMin,
  averageTechnicalCareDayMax: props.filters.averageTechnicalCareDayMax,
  averageKilometersDayMin: props.filters.averageKilometersDayMin,
  averageKilometersDayMax: props.filters.averageKilometersDayMax,
  averageConsultationsDayMin: props.filters.averageConsultationsDayMin,
  averageConsultationsDayMax: props.filters.averageConsultationsDayMax,
  departments: props.filters.departments,
});

watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = { ...newFilters };
  }
);

const applyFilters = () => {
  emit("apply", localFilters.value);
};

const resetFilters = () => {
  localFilters.value = {
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
    departments: undefined,
  };
  emit("apply", localFilters.value);
};
</script>

<style scoped>
.filters-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.filters-container h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
  color: white;
  font-weight: 700;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 6px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-group-full {
  grid-column: 1 / -1;
}

.filter-group label {
  font-weight: 700;
  margin-bottom: 8px;
  font-size: 13px;
  color: #222;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
}

.filter-group input {
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background-color: white;
  transition: all 0.2s ease;
}

.filter-group input::placeholder {
  color: #999;
}

.filter-group input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
  color: #333;
}

.filter-actions {
  display: flex;
  gap: 10px;
}

.btn-apply,
.btn-reset {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-apply {
  background-color: #0066cc;
  color: white;
}

.btn-apply:hover {
  background-color: #0052a3;
}

.btn-reset {
  background-color: #e0e0e0;
  color: #333;
}

.btn-reset:hover {
  background-color: #d0d0d0;
}
</style>
