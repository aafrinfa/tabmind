
<template>
  <v-app>
    <v-app-bar color="surface" elevation="0" border="b">
      <v-app-bar-title>
        <v-icon color="primary" class="mr-2">
          mdi-bookmark-multiple
        </v-icon>
        TabMind
      </v-app-bar-title>

      <v-chip color="primary" variant="tonal" class="mr-4">
        Personal library
      </v-chip>
    </v-app-bar>

    <v-main>
      <v-container class="py-8" max-width="1000">
        <section class="mb-8">
          <h1 class="text-h4 font-weight-bold mb-2">
            Your research library
          </h1>

          <p class="text-body-1 text-medium-emphasis">
            Keep useful links organized in one place.
          </p>
        </section>

        
        <v-card rounded="lg" border elevation="0" class="pa-4 mb-8">
          <v-card-title class="px-0 pt-0 mb-3">
            Add a bookmark
          </v-card-title>

          <v-form @submit.prevent="addBookmark">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  label="Title"
                  placeholder="Vue Documentation"
                  variant="outlined"
                  required
                  hide-details="auto"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="url"
                  label="URL"
                  placeholder="https://vuejs.org/"
                  variant="outlined"
                  type="url"
                  required
                  hide-details="auto"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="category"
                  label="Category"
                  :items="categories"
                  variant="outlined"
                  required
                  hide-details="auto"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="tagsInput"
                  label="Tags"
                  placeholder="vue, javascript, frontend"
                  hint="Separate tags with commas"
                  persistent-hint
                  variant="outlined"
                />
              </v-col>

              <v-col cols="12">
                <v-alert
                  v-if="errorMessage"
                  type="error"
                  variant="tonal"
                  class="mb-3"
                >
                  {{ errorMessage }}
                </v-alert>

                <v-btn
                  type="submit"
                  color="primary"
                  block
                  prepend-icon="mdi-plus"
                >
                  Save bookmark
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <section>
          <div class="d-flex align-center justify-space-between mb-4">
            <h2 class="text-h5 font-weight-bold">
              Your bookmarks
            </h2>

            <v-chip variant="tonal">
              {{ bookmarks.length }}
              {{ bookmarks.length === 1 ? 'bookmark' : 'bookmarks' }}
            </v-chip>
            <v-btn
              prepend-icon="mdi-download"
              variant="outlined"
              color="primary"
              :disabled="bookmarks.length === 0"
              @click="exportBookmarks"
            >
              Export backup
            </v-btn>
          </div>

          <v-card rounded="lg" border elevation="0" class="pa-4 mb-6">
            <v-row>
              <v-col cols="12" md="5">
                <v-text-field
                v-model="searchQuery"
                label="Search bookmarks"
                placeholder="Title, URL, or tag..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="comfortable"
                hide-details
                clearable
              />
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="selectedCategory"
                  :items="filterCategories"
                  label="Filter by category"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                />
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="sortBy"
                  :items="[
                    { title: 'Newest first', value: 'newest' },
                    { title: 'Oldest first', value: 'oldest' },
                    { title: 'Title A–Z', value: 'title' },
                  ]"
                  label="Sort by"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card>

          <v-row v-if="filteredBookmarks.length > 0">
            <v-col
              v-for="bookmark in filteredBookmarks"
              :key="bookmark.id"
              cols="12"
              sm="6"
              md="4"
            >
              <BookmarkCard
                :bookmark="bookmark"
                @delete="deleteBookmark"
                @toggle-favorite="toggleFavorite"
              />
            </v-col>
          </v-row>
          <v-card
            v-if="bookmarks.length > 0 && filteredBookmarks.length === 0"
            rounded="lg"
            border
            elevation="0"
            class="pa-8 text-center"
          >
            <v-icon size="40" color="secondary" class="mb-3">
              mdi-magnify
            </v-icon>

            <h3 class="text-h6 mb-2">
              No matching bookmarks
            </h3>

            <p class="text-body-2 text-medium-emphasis">
              Try a different search term or category.
            </p>
          </v-card>

          <!-- Show when the library is completely empty -->
          <v-card
            v-else-if="bookmarks.length === 0"
            rounded="lg"
            border
            elevation="0"
            class="pa-8 text-center"
          >
            <v-icon size="48" color="secondary" class="mb-3">
              mdi-bookmark-outline
            </v-icon>

            <h3 class="text-h6 mb-2">
              Your library starts here
            </h3>

            <p class="text-body-2 text-medium-emphasis">
              Add your first bookmark using the form above.
            </p>
          </v-card>

        </section>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BookmarkCard from './components/BookmarkCard.vue'

function loadBookmarks() {
  try {
    const savedBookmarks = localStorage.getItem('tabmind-bookmarks')
    return savedBookmarks ? JSON.parse(savedBookmarks) : []
  } catch (error) {
    console.error('Could not load bookmarks:', error)
    return []
  }
}

const bookmarks = ref(loadBookmarks())

watch(
  bookmarks,
  (newBookmarks) => {
    try {
      localStorage.setItem(
        'tabmind-bookmarks',
        JSON.stringify(newBookmarks),
      )
    } catch (error) {
      console.error('Could not save bookmarks:', error)
    }
  },
  { deep: true },
)

const title = ref('')
const url = ref('')
const category = ref('Development')
const tagsInput = ref('')
const errorMessage = ref('')

const categories = [
  'Development',
  'Finance',
  'Research',
  'Learning',
  'Other',
]

const searchQuery = ref('')
const selectedCategory = ref('All')
const sortBy = ref('newest')

const filterCategories = computed(() => [
  'All',
  ...new Set(bookmarks.value.map((bookmark) => bookmark.category)),
])

function addBookmark() {
  errorMessage.value = ''

  const cleanTitle = title.value.trim()
  const cleanUrl = url.value.trim()
  const cleanCategory = category.value

  if (!cleanTitle || !cleanUrl || !cleanCategory) {
    errorMessage.value = 'Please fill in the title, URL, and category.'
    return
  }

  let parsedUrl

  try {
    parsedUrl = new URL(cleanUrl)
  } catch {
    errorMessage.value = 'Please enter a valid URL, such as https://vuejs.org/'
    return
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    errorMessage.value = 'Only HTTP and HTTPS links are allowed.'
    return
  }

  const tags = [
    ...new Set(
      tagsInput.value
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  ]

  const bookmark = {
    id: crypto.randomUUID(),
    title: cleanTitle,
    url: parsedUrl.href,
    category: cleanCategory,
    tags,
    favorite: false,
    createdAt: Date.now(),
  }

  bookmarks.value.unshift(bookmark)

  title.value = ''
  url.value = ''
  category.value = 'Development'
  tagsInput.value = ''
  errorMessage.value = ''
}

function deleteBookmark(id) {
  bookmarks.value = bookmarks.value.filter(
    (bookmark) => bookmark.id !== id,
  )
}

const filteredBookmarks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  const result = bookmarks.value.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(query) ||
      bookmark.url.toLowerCase().includes(query) ||
      bookmark.tags.some((tag) => tag.includes(query))

    const matchesCategory =
      selectedCategory.value === 'All' ||
      bookmark.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })

  return result.sort((a, b) => {
    if (sortBy.value === 'title') {
      return a.title.localeCompare(b.title)
    }

    if (sortBy.value === 'oldest') {
      return a.createdAt - b.createdAt
    }

    return b.createdAt - a.createdAt
  })
})

function toggleFavorite(id) {
  const bookmark = bookmarks.value.find(
    (bookmark) => bookmark.id === id,
  )

  if (bookmark) {
    bookmark.favorite = !bookmark.favorite
  }
}

function exportBookmarks() {
  const json = JSON.stringify(bookmarks.value, null, 2)

  const blob = new Blob([json], {
    type: 'application/json',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'tabmind-backup.json'
  link.click()

  URL.revokeObjectURL(url)
}
</script>
