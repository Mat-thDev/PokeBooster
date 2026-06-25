"use client"

import BoosterOpeningModal from "@/components/modals/BoosterOpeningModal";
import useModal from "@/hooks/useModal";
import { Modals } from "@/types/jotai";
import { ComponentType, useEffect, useRef } from "react";

const MODALS_MAPPING: Record<Modals, ComponentType<any>> = {
    "BoosterOpening": BoosterOpeningModal
};

const ModalProvider = () => {
    const { active, close } = useModal();
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (active.modal) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [active.modal]);

    const Element = active.modal ? MODALS_MAPPING[active.modal] : null;

    if (!Element) return null;

    return (
        <dialog
            ref={modalRef}
            id="modalContainer"
            className="modal"
            onClose={() => close()}
        >
            <div className="modal-box max-w-4xl bg-base-200/95 backdrop-blur-md border border-base-content/5 p-6 shadow-2xl">
                <Element {...(active.props ?? {})} />
            </div>

            <form method="dialog" className="modal-backdrop bg-base-300/40 backdrop-blur-sm">
                <button type="submit">close</button>
            </form>
        </dialog>
    );
};

export default ModalProvider;