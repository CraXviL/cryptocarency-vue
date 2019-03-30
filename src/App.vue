<template>
	<b-container>
		<header class="d-flex fixed align-items-center pt-3">
			<b-col><h5>Name</h5></b-col>
			<b-col><h5>Price</h5></b-col>
			<b-col><h5>Market Cap</h5></b-col>
			<b-col><h5>Volume (24Hr)</h5></b-col>
			<b-col></b-col>
		</header>
		<div class="wrapper">
			<b-table striped hover fixed theadClass="d-none" 
							:items="items" :fields="fields"></b-table>
		</div>
	</b-container>
</template>

<script>

	import {mapGetters, mapMutations, mapActions} from 'vuex';

	export default {
		computed: {
			...mapGetters(['items', 'fields']),
		},
		mounted() {
			init: {
				this.$store.dispatch('makeRequest');
				$('.wrapper').css('height', $(window).height() - 70 + "px");
				$('.wrapper').hover(() => {
					$('table').height()+70 > $(window).height() ?
						$('table tbody td:last-child').hide() : false
					$('.wrapper').css('overflow-y', 'auto');
				}, () => {
					$('table tbody td:last-child').show()
					$('.wrapper').css('overflow-y', 'hidden');
				});
				if (window.innerWidth < 768) {
					this.$store.commit('decreaseTable');
					$('header>div:nth-child(3)').hide();
					$('header>div:nth-child(4)').hide();
				}
				window.addEventListener('resize', () => {
					if (window.innerWidth < 768) {
						this.$store.commit('decreaseTable');
						$('header>div:nth-child(3)').hide();
						$('header>div:nth-child(4)').hide();
					} else {
						this.$store.commit('increaseTable');
						$('header>div:nth-child(3)').show();
						$('header>div:nth-child(4)').show();
					}
					$('.wrapper').css('height', $(window).height() - 70 + "px");
				}, { passive: true });

			}
		}

	}

</script>

<style lang="sass">

	@import './styles/style'

</style>