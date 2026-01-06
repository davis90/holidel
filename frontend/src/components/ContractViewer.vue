<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Contract } from "../types/contract";
import { contractService } from "../services/contractService";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

const contract = ref<Contract | null>(null);
const contractHTML = ref<string>("");
const loading = ref(true);
const error = ref<string | null>(null);
onMounted(async () => {
  try {
    loading.value = true;
    contract.value = await contractService.loadContract();
    // Initialiser le contenu éditable
    if (contract.value) {
      const html = await marked(contract.value.content);
      contractHTML.value = sanitizeHtml(html);
    }
  } catch (err) {
    error.value = "Impossible de charger le contrat. Veuillez réessayer.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="contract-viewer">
    <div v-if="loading" class="loading">
      <p>Chargement du contrat...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="contract" class="contract-container">
      <h2>{{ contract.title }}</h2>
      <div class="contract-content" v-html="contractHTML"></div>
    </div>
  </div>
</template>

<style scoped>
.contract-viewer {
  color: black;
  text-align: initial;
}
</style>
