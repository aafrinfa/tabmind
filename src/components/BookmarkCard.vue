
<script setup>
defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
})

defineEmits(['delete'])
</script>

<template>
  <v-card rounded="lg" border elevation="0" height="100%">
    <v-card-item>
      <template #prepend>
        <v-avatar color="primary" variant="tonal" rounded="lg">
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-avatar>
      </template>

      <v-card-title class="text-wrap">
        {{ bookmark.title }}
      </v-card-title>

      <v-card-subtitle>
        {{ bookmark.category }}
      </v-card-subtitle>

      <template #append>
        <v-btn
          icon="mdi-delete-outline"
          variant="text"
          color="error"
          aria-label="Delete bookmark"
          @click="$emit('delete', bookmark.id)"
        />
      </template>
    </v-card-item>

    <v-card-text>
      <div class="text-body-2 mb-3">
        <a
          :href="bookmark.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary text-decoration-none"
        >
          {{ bookmark.url }}
          <v-icon size="small">mdi-open-in-new</v-icon>
        </a>
      </div>

      <v-chip
        v-for="tag in bookmark.tags"
        :key="tag"
        size="small"
        variant="tonal"
        class="mr-1 mb-1"
      >
        {{ tag }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>
