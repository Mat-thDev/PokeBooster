export type MyCollectionSchema = Record<string, string[]>;

export type Modals = "BoosterOpening"

export interface ModalState {
    modal: Modals | null
    props: any
}