import { activeModalAtom } from "@/store/atom";
import { Modals } from "@/types/jotai";
import { useAtom } from "jotai";

const useModal = () => {

    const [activeModal, setActiveModal] = useAtom(activeModalAtom);

    const open = ({ target, props }: { target: Modals, props: any }) => {
        setActiveModal({ modal: target, props });
    }

    const close = () => setActiveModal({ modal: null, props: {} });

    return {
        active: activeModal,
        open,
        close
    }
}


export default useModal;