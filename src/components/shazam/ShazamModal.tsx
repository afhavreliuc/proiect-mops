import { useState } from "react";
import Image from "next/image";

const ShazamModal: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setModalOpen(true);
          console.error("caca");
        }}
        className="px-2 font-normal w-full text-xl border h-12 flex justify-between items-center"
      >
        <Image
          src={"/shazam-512.png"}
          alt={"Shazam Icon"}
          width={28}
          height={28}
        />
        <span>Shazam a Sosng</span>
        <span></span>
      </button>
      {isModalOpen && (
        <dialog className="modal">
          <div className="modal-box">asd</div>
        </dialog>
      )}
    </>
  );
};

export default ShazamModal;
