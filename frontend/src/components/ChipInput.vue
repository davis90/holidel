<template>
  <div class="chip-input-container">
    <div class="chips-wrapper">
      <div v-for="chip in modelValue" :key="chip" class="chip">
        <span>{{ chip }}</span>
        <button @click="removeChip(chip)" class="chip-remove" type="button">×</button>
      </div>
      <input
        v-model.number="inputValue"
        @keydown.enter="addChip"
        @keydown.comma.prevent="addChip"
        @blur="addChip"
        type="number"
        :placeholder="modelValue.length === 0 ? 'Ajouter un département...' : ''"
        class="chip-input"
        min="1"
        max="976"
      />
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div class="help-text">Appuyez sur Entrée ou virgule pour ajouter (01-976)</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: number[];
  }>(),
  {
    modelValue: () => [],
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: number[]];
}>();

const inputValue = ref<number | null>(null);
const errorMessage = ref("");

const addChip = (event?: KeyboardEvent) => {
  if (event) {
    event.preventDefault();
  }

  if (inputValue.value === null || inputValue.value === "") {
    errorMessage.value = "";
    return;
  }

  const num = Math.floor(inputValue.value);

  // Validation
  if (num < 1 || num > 976) {
    errorMessage.value = "Le département doit être entre 01 et 976";
    return;
  }

  // Vérifier si déjà présent
  if (props.modelValue.includes(num)) {
    errorMessage.value = `Le département ${num} est déjà ajouté`;
    return;
  }

  // Ajouter le chip
  const newChips = [...props.modelValue, num].sort((a, b) => a - b);
  emit("update:modelValue", newChips);
  inputValue.value = null;
  errorMessage.value = "";
};

const removeChip = (chip: number) => {
  const newChips = props.modelValue.filter((c) => c !== chip);
  emit("update:modelValue", newChips);
  errorMessage.value = "";
};
</script>

<style scoped>
.chip-input-container {
  width: 100%;
}

.chips-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  background-color: white;
  min-height: 44px;
  align-items: center;
  transition: all 0.2s ease;
}

.chips-wrapper:focus-within {
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #e3f2fd;
  color: #0066cc;
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
}

.chip-remove {
  background: none;
  border: none;
  color: #0066cc;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  margin: 0;
  line-height: 1;
  transition: all 0.2s ease;
}

.chip-remove:hover {
  color: #c62828;
  transform: scale(1.3);
}

.chip-input {
  flex: 1;
  min-width: 150px;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 6px 4px;
  color: #333;
  background: transparent;
}

.chip-input::placeholder {
  color: #999;
}

.error-message {
  margin-top: 6px;
  font-size: 12px;
  color: #c62828;
  font-weight: 500;
}

.help-text {
  margin-top: 6px;
  font-size: 12px;
  color: #666;
  font-style: italic;
}
</style>
