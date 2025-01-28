import {
  useCreateProductVariantMutation,
  useDeleteProductVariantMutation,
  useUpdateProductVariantMutation,
} from "@/redux/api/products";
import { Check, Edit, PlusIcon, Trash2, X } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const VariantForm = ({
  variants,
  setVariants,
  isEdit,
  productId = "",
}: any) => {
  const [variantAddOption, setVariantAddOption] = useState(!isEdit);
  const [editableVariant, setEditableVariant] = useState("");
  const [createVariantData, setCreateVaraintData] = useState({
    size: "",
    price: 0,
  });

  const [
    createProductVariant,
    { isLoading: createVariantLoading, isError: createVariantError },
  ] = useCreateProductVariantMutation();
  const [
    updateProductVariant,
    { isLoading: updateVariantLoading, isError: updateVariantError },
  ] = useUpdateProductVariantMutation();
  const [
    deleteProductVariant,
    { isLoading: deleteVariantLoading, isError: deleteVariantError },
  ] = useDeleteProductVariantMutation();

  const updateVariantHandler = async (variant: any) => {
    const toastId = toast.loading("Updating...");
    try {
      const res = await updateProductVariant({
        id: variant.id,
        size: variant.size,
        price: parseInt(variant.price),
        isOutOfStock: variant.isOutOfStock,
      }).unwrap();
      if (updateVariantError) throw new Error("Something wrong!");

      toast.success("Updation Successfully!");
    } catch (error) {
      console.log("Error while updating variant", error);
      toast.error("Updation Failed");
    }
    setEditableVariant("");
    toast.dismiss(toastId);
  };

  // Create variant handler

  const createVariantHandler = async () => {
    console.log("Variant Handler");
    const alreadyPresent = variants.filter(
      (variant: any) => variant.size === createVariantData.size
    );
    console.log(alreadyPresent);

    if (alreadyPresent.length != 0) {
      toast.error("Already Present size");
    } else if (isEdit) {
      const toastId = toast.loading("Creating...");
      try {
        const res = await createProductVariant({
          ...createVariantData,
          productId: productId,
        }).unwrap();
        console.log("Create varinat response", res);
        if (createVariantError) {
          toast.error("Something went wrong!");
          return;
        }
        toast.success("Variant added!");
      } catch (error) {
        console.log(error);
        toast.error("Variant add failed!");
      }
      toast.dismiss(toastId);
    } else {
      variants.push({ id: variants.length, ...createVariantData });
    }
    setCreateVaraintData({ size: "", price: 0 });
    setVariantAddOption(false);
  };

  const deleteVariantHandler = async (v: any) => {
    if (!isEdit) {
      setVariants(variants.filter((vari: any) => vari.size !== v.size));
      return;
    }

    if (variants.length == 1) {
      toast.warning("Atleast one variant required!");
      return;
    }

    const toastId = toast.loading("Deleting...");
    try {
      const res = await deleteProductVariant(v.id).unwrap();
      if (deleteVariantError) throw new Error("Something wrong!");
      toast.success("Deletion Successfully!");
    } catch (error) {
      console.log("Error while deleting variant", error);
      toast.error("Deletion Failed");
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-semibold py-2">Variants</h2>

        <div
          onClick={() => setVariantAddOption(!variantAddOption)}
          className="scale-110 cursor-pointer px-2 py-1 bg-blue-300 rounded-xl"
        >
          {variantAddOption ? <X /> : <PlusIcon />}
        </div>
      </div>
      {updateVariantLoading || createVariantLoading || deleteVariantLoading ? (
        <div className="my-4"> Loading....</div>
      ) : (
        <>
          {/* Varinats list */}
          <div className="my-4">
            {variants.length === 0 && variantAddOption == false ? (
              <div className="py-8 px-6 w-full text-center font-semibold ">
                {" "}
                No Variant Added
              </div>
            ) : (
              variants?.map((v: any, index: any) => {
                return (
                  <div>
                    {editableVariant === v.id ? (

                      // variant field during editing

                      <div className="w-full space-y-1">
                        <div className="w-full flex gap-4 items-center">
                          {/* Size input and label */}
                          <div className="w-full">
                            <label
                              htmlFor="size"
                              className="block text-[1rem] font-semibold text-gray-600 "
                            >
                              Size <sup className="text-pink-800 pl-1">*</sup>
                            </label>
                            <input
                              id="size"
                              required
                              type="text"
                              placeholder="Ex: S"
                              defaultValue={v.size}
                              onChange={(e) => (v.size = e.target.value)}
                              className="input-style !py-1 w-full"
                            />
                          </div>

                          {/* Price input and label */}
                          <div className="w-full">
                            <label
                              htmlFor="price"
                              className="block text-[1rem] font-semibold text-gray-600 "
                            >
                              Prize <sup className="text-pink-800 pl-1">*</sup>
                            </label>
                            <input
                              id="price"
                              type="text"
                              required
                              placeholder="Ex: 123"
                              defaultValue={v.price}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                (v.price = e.target.value)
                              }
                              className="input-style !py-1 w-full"
                            />
                          </div>

                          {/* Variant edit button */}
                          <div className="flex gap-2 items-center justify-center">
                            <div
                              onClick={() => setEditableVariant("")}
                              className="text-red-400 hover:text-red-600 mt-4 cursor-pointer"
                            >
                              <X />
                            </div>
                            <button
                              disabled={
                                updateVariantLoading ||
                                createVariantLoading ||
                                deleteVariantLoading
                              }
                              onClick={() => updateVariantHandler(v)}
                              className="flex items-center justify-center h-full pt-4 scale-110 text-blue-500 hover:text-blue-700 cursor-pointer"
                            >
                              <Check />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className=" flex w-full items-center justify-between py-2"
                        key={index}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-600">
                            Size:
                          </p>
                          <div className="py-1 px-2 min-w-20 text-center text-wrap bg-blue-300 rounded-xl">
                            {v?.size.length > 6
                              ? v.size.slice(0, 5) + "..."
                              : v.size}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-600">
                            Price:
                          </p>
                          <div className="py-1 px-2 min-w-20 text-center bg-blue-300 rounded-xl">
                            {v?.price}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 py-1 px-4 rounded-xl border border-gray-300 bg-gray-200">
                          <button
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            onClick={() => deleteVariantHandler(v)}
                            disabled={
                              updateVariantLoading ||
                              createVariantLoading ||
                              deleteVariantLoading
                            }
                          >
                            <Trash2 />
                          </button>
                          {isEdit && (
                            <>
                              <button
                                className="text-blue-500 cursor-pointer hover:text-blue-700"
                                onClick={() => {
                                  setEditableVariant(v.id);
                                }}
                              >
                                <Edit />
                              </button>
                              <label
                                htmlFor={v.id}
                                className="relative inline-block h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-blue-500"
                              >
                                <input
                                  type="checkbox"
                                  id={v.id}
                                  className="peer sr-only"
                                  checked={v.isOutOfStock}
                                  onChange={() =>{ 
                                    updateProductVariant({...v,isOutOfStock:!v.isOutOfStock})}}
                                  disabled={
                                    updateVariantLoading ||
                                    createVariantLoading ||
                                    deleteVariantLoading
                                  }
                                />

                                <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:start-6"></span>
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Variant Add form  */}

          {variantAddOption && (
            <div className="w-full space-y-1">
              <div className="w-full flex gap-4 items-center">
                {/* Size input and label */}
                <div className="w-full">
                  <label
                    htmlFor="size"
                    className="block text-[1rem] font-semibold text-gray-600 "
                  >
                    Size <sup className="text-pink-800 pl-1">*</sup>
                  </label>
                  <input
                    id="size"
                    required
                    type="text"
                    placeholder="Ex: S"
                    value={createVariantData.size}
                    onChange={(e) =>
                      setCreateVaraintData({
                        size: e.target.value,
                        price: createVariantData.price,
                      })
                    }
                    className="input-style w-full"
                  />
                </div>

                {/* Price input and label */}
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block text-[1rem] font-semibold text-gray-600 "
                  >
                    Prize <sup className="text-pink-800 pl-1">*</sup>
                  </label>
                  <input
                    id="price"
                    type="number"
                    required
                    placeholder="Ex: 123"
                    value={createVariantData.price}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCreateVaraintData({
                        size: createVariantData.size,
                        price: parseInt(e.target.value),
                      })
                    }
                    className="input-style w-full"
                  />
                </div>

                {/* Variant create button */}
                <button
                  disabled={
                    createVariantLoading ||
                    updateVariantLoading ||
                    deleteVariantLoading
                  }
                  onClick={createVariantHandler}
                  className="flex items-center justify-center h-full pt-4 scale-125 text-blue-500 cursor-pointer"
                >
                  <Check />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VariantForm;
