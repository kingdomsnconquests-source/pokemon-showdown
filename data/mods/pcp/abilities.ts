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
	sharpshooter: {
		onModifyPriority(priority, source, target, move) {
			if (move.flags['bullet']) {
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
