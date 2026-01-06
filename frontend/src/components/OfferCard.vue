<template>
  <div class="offer-card">
    <div class="offer-header">
      <h3>{{ offer.nurse?.firstName }} {{ offer.nurse?.lastName }}</h3>
      <span class="status" :class="offer.nurse?.status">{{ offer.nurse?.status }}</span>
    </div>

    <div class="offer-body">
      <div class="info-row">
        <div class="info-group">
          <label>Jours:</label>
          <p>{{ offer.nbDaysMin }} - {{ offer.nbDaysMax }}</p>
        </div>
        <div class="info-group">
          <label>Taux rétrocession:</label>
          <p>{{ offer.retrocessionRate }}%</p>
        </div>
      </div>

      <div class="info-row">
        <div class="info-group">
          <label>Soins techniques/jour:</label>
          <p>{{ offer.averageTechnicalCareDay }}</p>
        </div>
        <div class="info-group">
          <label>Km/jour:</label>
          <p>{{ offer.averageKilometersDay }}</p>
        </div>
        <div class="info-group">
          <label>Consultations/jour:</label>
          <p>{{ offer.averageConsultationsDay }}</p>
        </div>
      </div>

      <div class="info-group">
        <label>Période:</label>
        <p>{{ formatDate(offer.period[0]) }} - {{ formatDate(offer.period[1]) }}</p>
      </div>

      <div class="info-group">
        <label>Départements autorisés:</label>
        <p>{{ offer.nurse?.authorizedDepartment?.join(', ') || 'N/A' }}</p>
      </div>

      <div v-if="offer.nurse?.description" class="info-group">
        <label>Description:</label>
        <p>{{ offer.nurse.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Offer } from "../types/offer";

defineProps<{
  offer: Offer;
}>();

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR");
};
</script>

<style scoped>
.offer-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.offer-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.offer-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.offer-header h3 {
  margin: 0;
  font-size: 18px;
}

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  white-space: nowrap;
}

.offer-body {
  padding: 15px;
  flex: 1;
}

.info-group {
  margin-bottom: 12px;
}

.info-group label {
  font-weight: 600;
  color: #333;
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 3px;
}

.info-group p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.info-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}
</style>
