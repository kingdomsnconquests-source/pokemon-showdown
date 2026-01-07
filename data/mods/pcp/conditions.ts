export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	partiallytrapped: {
		inherit: true,
		durationCallback(target, source) {
            if (this.effectState.sourceEffect.id === 'blackhole' || this.effectState.sourceEffect.id === 'touchtrap') {
				return 2;
			} else if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onResidual(pokemon) {
            const source = this.effectState.source;
            if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
                delete pokemon.volatiles['partiallytrapped'];
                this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
                return;
            }
            if (this.effectState.sourceEffect.id === 'blackhole' || this.effectState.sourceEffect.id === 'touchtrap') {
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
	},
};
