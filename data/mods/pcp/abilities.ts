export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	coffinscurse: {
		onTryHit(target, source, move) {
			if (move.type === 'Poison') {
				this.add('-immune', target, '[from] ability: coffinscurse');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.type === 'Poison') {
				this.add('-immune', this.effectState.target, '[from] ability: coffinscurse');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Normal' || move.type === 'Flying' || move.type === 'Rock' || move.type === 'Bug' || move.type === 'Steel' || move.type === 'Grass' || move.type === 'Psychic' || move.type === 'Ice' || move.type === 'Dragon' || move.type === 'Fairy') {
				this.debug('coffinscurse weaken');
				this.add('-message', "It seems the attack is not very effective...");
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 6,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Normal' || move.type === 'Flying' || move.type === 'Rock' || move.type === 'Bug' || move.type === 'Steel' || move.type === 'Grass' || move.type === 'Psychic' || move.type === 'Ice' || move.type === 'Dragon' || move.type === 'Fairy') {
				this.debug('coffinscurse weaken');
				this.add('-message', "It seems the attack is not very effective...");
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Coffin's Curse",
		shortDesc: "This Pokemon gains the defensive properties of the Steel-type.",
		desc: "This Pokemon gains the defensive properties of the Steel-type.",
	},
	pseudowood: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (source === this.effectState.target && target.pseudoTriggered) return;
			if (effect?.effectType === 'Move' && !target.pseudoTriggered) {
				this.add('-activate', target, 'ability: Pseudo Wood');
				target.pseudoTriggered = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (!pokemon.pseudoTriggered) return;
			if (pokemon.pseudoTriggered) {
				this.add('-message', "The Pokemon's false exterior absorbed the hit!")
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
			}
		},
		flags: { breakable: 1 },
		name: "Pseudo Wood",
		shortDesc: "Once per battle, an attack against this Pokemon deals 1/8 max HP damage.",
		desc: "Once per battle, this Pokemon's false exterior can absorb a hit for 1/8 max HP damage."
	},
	sharpshooter: {
		onModifyPriority(priority, source, target, move) {
			if (move.flags['bullet']) {
				this.add('-message', "The Sharpshooter draws quickly!")
				return priority + 1
			}
		},
		flags: {},
		name: "Sharpshooter",
		shortDesc: "This Pokemon's bullet moves have +1 priority.",
		desc: "This Pokemon's bullet moves have +1 priority."
	},
	touchtrap: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-activate', target, 'ability: Touch Trap');
				source.addVolatile('partiallyTrapped');
			}
		},
		flags: {},
		name: "Touch Trap",
		shortDesc: "Contact with this Pokemon traps the attacker.",
		desc: "Contact with this Pokemon traps the attacker"
	}
};
