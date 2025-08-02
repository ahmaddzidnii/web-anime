"use client";

import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useIsClient } from "usehooks-ts";
import { FaSpinner } from "react-icons/fa6";
import { MdFormatListBulletedAdd } from "react-icons/md";

import { useAddListModal } from "@/hooks/use-add-list-modal";
import { Button } from "@/components/ui/button";

export const AddListDetailPage = ({ data }) => {
  const { isSignedIn } = useAuth();
  const isClient = useIsClient();

  const { onOpen } = useAddListModal();

  const onAddToList = () => {
    if (!isClient) {
      return;
    }

    if (!isSignedIn) {
      return toast.error("Anda harus login terlebih dahulu.");
    }

    onOpen(data);
  };

  return (
    <button
      disabled={!isClient}
      onClick={onAddToList}
      className="flex w-[147.91px] items-center justify-center rounded bg-gray-700 px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
    >
      {!isClient ? (
        <FaSpinner className="h-5 w-5 animate-spin" />
      ) : (
        "Add to List"
      )}
    </button>
  );
};

export const AddList = ({ data, withText = false }) => {
  const { isSignedIn } = useAuth();
  const isClient = useIsClient();

  const { onOpen } = useAddListModal();

  const onAddToList = () => {
    if (!isClient) {
      return;
    }

    if (!isSignedIn) {
      return toast.error("Anda harus login terlebih dahulu.");
    }

    onOpen(data);
  };

  return (
    <Button
      title="Tambahkan ke list"
      onClick={onAddToList}
      disabled={!isClient}
      className={withText && "w-full gap-x-3 text-sm sm:text-lg"}
      variant={withText ? "default" : "ghost"}
    >
      <MdFormatListBulletedAdd className=" h-6 w-6" />
      {withText && <span className="text-sm">Tambahkan ke list</span>}
    </Button>
  );
};
