export interface MetaAtom {
  id: number,
  name: string,
  icon: string | null,
  path: string,
  group: string,
  frontEnd: string | null,
  backEnd: string | null,
  desc: string | null
}

export interface TreasureState {
  expanded?: boolean,
  metadata: {
    links: MetaAtom[],
    components: MetaAtom[]
  }
}

export interface MetadataInterface {
  id: number,
  label: string,
  type: string,
  target: string,
  icon?: string
}