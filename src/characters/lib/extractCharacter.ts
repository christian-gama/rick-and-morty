export const extractCharacterIds = (characters: string[]) =>
	characters.map((character) => parseInt(character.match(/character\/(\d+)/)?.[1] ?? '0'))
