
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
          </div>

          <v-row v-if="bookmarks.length > 0">
            <v-col
              v-for="bookmark in bookmarks"
              :key="bookmark.id"
              cols="12"
              sm="6"
              md="4"
            >
              <BookmarkCard
                :bookmark="bookmark"
                @delete="deleteBookmark"
              />
            </v-col>
          </v-row>

          <v-card
            v-else
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
import { ref } from 'vue'
import BookmarkCard from './components/BookmarkCard.vue'

const bookmarks = ref([])

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
</script>
