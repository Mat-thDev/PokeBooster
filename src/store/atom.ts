import { ModalState, MyCollectionSchema } from "@/types/jotai";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";



export const myCollectionAtom = atomWithStorage<MyCollectionSchema>("mycollection", {});

export const activeModalAtom = atom<ModalState>({ modal: null, props: {} });