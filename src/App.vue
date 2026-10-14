
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

        <v-card rounded="lg" border elevation="0" class="pa-4 mb-6">
          <v-row align="center">
            <v-col cols="12" sm="8">
              <v-text-field
                label="Search bookmarks"
                placeholder="Search by title or tag..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="comfortable"
                hide-details
                disabled
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-btn
                color="primary"
                block
                prepend-icon="mdi-plus"
                disabled
              >
                Add bookmark
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-card rounded="lg" border elevation="0" class="pa-8 text-center">
          <v-icon size="48" color="secondary" class="mb-3">
            mdi-bookmark-outline
          </v-icon>

          <h2 class="text-h6 mb-2">Your library starts here</h2>

          <p class="text-body-2 text-medium-emphasis">
            Bookmark creation will be available in our next phase.
          </p>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

