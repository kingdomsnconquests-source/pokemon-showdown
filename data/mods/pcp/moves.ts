export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	celestialcrash: {
		name: "Celestial Crash",
		accuracy: 100,
		category: 'Physical',
		basePower: 100,
		pp: 5,
		priority: 0,
		flags: { contact: 1, metronome: 1, mirror: 1, protect: 1 },
		onModifyMove(move, pokemon, target) {
			if (pokemon.getStat('spa', false, false) > (pokemon.getStat('atk', false, false))) {
				move.overrideOffensiveStat = 'spa';
			}
		},
		secondary: null,
		target: 'normal',
		type: "Rock",
	},
	coralcrunch: {
		name: "Coral Crunch",
		accuracy: 100,
		category: 'Physical',
		basePower: 80,
		pp: 10,
		priority: 0,
		flags: { bite: 1, contact: 1, metronome: 1, mirror: 1, protect: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: 'normal',
		type: "Water",
	},
	pixiepowerdrive: {
		name: "Pixie Powerdrive",
		accuracy: 100,
		category: 'Physical',
		basePower: 120,
		pp: 15,
		priority: 0,
		recoil: [1, 3],
		flags: { contact: 1, metronome: 1, mirror: 1, protect: 1 },
		secondary: null,
		target: 'normal',
		type: "Fairy",
	}
};
