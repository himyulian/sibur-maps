<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
					<q-icon name="menu" />
				</q-btn>

				<q-toolbar-title>SIBUR maps</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
			<q-list padding class="rounded-borders text-primary text-weight-bold">
				<q-item>
					<q-item-section avatar>
						<q-avatar color="primary" text-color="white">
							<img v-if="currentUser && currentUser.PictureUrl" :src="currentUser && currentUser.PictureUrl" />
							<q-icon v-else name="fas fa-user" />
						</q-avatar>
					</q-item-section>
					<q-item-section>
						<q-item-label>{{ currentUser && currentUser.DisplayName || 'Name' }}</q-item-label>
						<q-item-label caption lines="1">{{ currentUser && currentUser.Email || 'Email' }}</q-item-label>
						<q-item-label caption lines="2">{{ getCurrentUserCompany || 'Company' }}</q-item-label>
					</q-item-section>
				</q-item>

				<q-separator />

				<q-item
					to="/"
					exact
					clickable
					v-ripple
					:active="link === 'index'"
					@click="link = 'index'"
					active-class="my-menu-link"
				>
					<q-item-section avatar>
						<q-icon name="fas fa-map" />
					</q-item-section>

					<q-item-section>Воронежсинтезкаучук</q-item-section>
				</q-item>

<!-- 				<q-item
					to="/MapVSK"
					exact
					clickable
					v-ripple
					:active="link === 'mapVSK'"
					@click="link = 'mapVSK'"
					active-class="my-menu-link"
				>
					<q-item-section avatar>
						<q-icon name="fas fa-map" />
					</q-item-section>

					<q-item-section>Воронежсинтезкаучук</q-item-section>
				</q-item> -->

			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
	name: 'Layout',
	data() {
		return {
			leftDrawerOpen: this.$q.platform.is.desktop,
			link: '',
		}
  },
  computed: {
		...mapState('user', ['currentUser']),
    ...mapGetters('user', ['getCurrentUserCompany'])
  },
	methods: {
		openURL,
		...mapActions('user', ['actFetchCurrentUser'])
  },
  created() {
    if (process.env.PROD) {
      this.actFetchCurrentUser()
    }
  }
}
</script>

<style lang="stylus">
	.my-menu-link {
		color: white;
		background: teal;
	}
</style>
