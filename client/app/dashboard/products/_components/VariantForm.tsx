import {
  useCreateProductVariantMutation,
  useDeleteProductVariantMutation,
  useUpdateProductVariantMutation,
} from '@/redux/api/products';
import { Check, Edit, PlusIcon, Trash2, X } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductVariantInterface } from '@/types/products';

interface VariantFormProps {
  variants: ProductVariantInterface[];
  setVariants: React.Dispatch<React.SetStateAction<ProductVariantInterface[]>>;
  isEdit: boolean;
  productId?: string;
  standalone?: boolean;
}

const VariantForm = ({
  variants,
  setVariants,
  isEdit,
  productId = '',
  standalone = false,
}: VariantFormProps) => {
  const [variantAddOption, setVariantAddOption] = useState(!isEdit);
  const [editableVariant, setEditableVariant] = useState('');
  const [createVariantData, setCreateVaraintData] = useState<{
    size: string;
    price: number;
  }>({
    size: '',
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

  const updateVariantHandler = async (variant: ProductVariantInterface) => {
    const toastId = toast.loading('Updating...');
    try {
      const res = await updateProductVariant({
        id: variant.id,
        size: variant.size,
        price: Number(variant.price),
        isOutOfStock: variant.isOutOfStock,
      }).unwrap();
      if (updateVariantError) throw new Error('Something wrong!');

      toast.success('Updation Successfully!');
    } catch (error) {
      toast.error('Updation Failed');
    }
    setEditableVariant('');
    toast.dismiss(toastId);
  };

  const createVariantHandler = async () => {
    if (!createVariantData.size || createVariantData.price <= 0) {
      toast.error('Please enter a valid size and price');
      return;
    }
    const alreadyPresent = variants.filter(
      (variant: any) =>
        variant.size.toLowerCase() === createVariantData.size.toLowerCase(),
    );

    if (alreadyPresent.length !== 0) {
      toast.error('Size already exists');
      return;
    }

    if (isEdit) {
      const toastId = toast.loading('Creating...');
      try {
        const res = await createProductVariant({
          ...createVariantData,
          productId: productId,
        }).unwrap();
        if (createVariantError) {
          toast.error('Something went wrong!');
          return;
        }
        toast.success('Variant added!');
      } catch (error) {
        toast.error('Variant add failed!');
      }
      toast.dismiss(toastId);
    } else {
      variants.push({ id: String(variants.length), ...createVariantData });
    }
    setCreateVaraintData({ size: '', price: 0 });
    setVariantAddOption(false);
  };

  const deleteVariantHandler = async (v: ProductVariantInterface) => {
    if (!isEdit) {
      setVariants(variants.filter((vari: any) => vari.size !== v.size));
      return;
    }

    if (variants.length === 1) {
      toast.warning('At least one variant is required!');
      return;
    }

    const toastId = toast.loading('Deleting...');
    try {
      const res = await deleteProductVariant(v.id).unwrap();
      if (deleteVariantError) throw new Error('Something wrong!');
      toast.success('Deletion Successfully!');
    } catch (error) {
      toast.error('Deletion Failed');
    }
    toast.dismiss(toastId);
  };

  return (
    <div
      className={`w-full mt-8 ${standalone ? '' : 'rounded-xl border border-border bg-gray-50/50 p-4'}`}
    >
      <div className="flex w-full items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Variants & Pricing
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage sizes and pricing for this product
          </p>
        </div>

        <Button
          type="button"
          variant={variantAddOption ? 'outline' : 'default'}
          size="sm"
          className="gap-2"
          onClick={() => setVariantAddOption(!variantAddOption)}
        >
          {variantAddOption ? (
            <X className="h-4 w-4" />
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
          {variantAddOption ? 'Cancel' : 'Add Variant'}
        </Button>
      </div>

      {updateVariantLoading || createVariantLoading || deleteVariantLoading ? (
        <div className="my-4 text-sm text-muted-foreground flex items-center justify-center py-4">
          {' '}
          Loading variant data...
        </div>
      ) : (
        <div className="space-y-4">
          {/* Variants list */}
          <div className="space-y-2">
            {variants.length === 0 && !variantAddOption ? (
              <div className="w-full rounded-lg border border-dashed border-gray-300 px-6 py-8 text-center text-sm font-medium text-muted-foreground bg-white">
                No variants added yet.
              </div>
            ) : (
              variants?.map((v: ProductVariantInterface, index: number) => (
                <div key={v.id || index} className="w-full">
                  {editableVariant === v.id ? (
                    // Edit Mode
                    <div className="w-full rounded-lg border border-border bg-white p-3 shadow-sm">
                      <div className="flex w-full items-start gap-3">
                        <div className="w-full">
                          <label
                            htmlFor="size"
                            className="mb-1 block text-xs font-semibold text-foreground"
                          >
                            Size <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="size"
                            required
                            type="text"
                            placeholder="Ex: Small"
                            defaultValue={v.size}
                            onChange={(e) => (v.size = e.target.value)}
                            className="h-9"
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="price"
                            className="mb-1 block text-xs font-semibold text-foreground"
                          >
                            Price <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="price"
                            type="number"
                            required
                            placeholder="Ex: 123"
                            defaultValue={v.price}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              (v.price = Number(e.target.value))
                            }
                            className="h-9"
                          />
                        </div>

                        <div className="flex h-[60px] items-end pb-0.5 gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:bg-gray-100"
                            onClick={() => setEditableVariant('')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            className="h-9 w-9 bg-green-600 hover:bg-green-700 text-white"
                            disabled={
                              updateVariantLoading ||
                              createVariantLoading ||
                              deleteVariantLoading
                            }
                            onClick={() => updateVariantHandler(v)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex w-full items-center justify-between rounded-lg border border-border bg-white px-4 py-3 shadow-sm transition-colors hover:bg-gray-50/50">
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Size
                          </span>
                          <span className="font-semibold text-foreground">
                            {v.size}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Price
                          </span>
                          <span className="font-semibold text-foreground">
                            ₹{v.price}
                          </span>
                        </div>
                        {isEdit && v.isOutOfStock && (
                          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {isEdit && (
                          <>
                            <div className="flex items-center gap-2 mr-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                In Stock
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  updateProductVariant({
                                    ...v,
                                    isOutOfStock: !v.isOutOfStock,
                                  });
                                }}
                                disabled={
                                  updateVariantLoading ||
                                  createVariantLoading ||
                                  deleteVariantLoading
                                }
                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                                  !v.isOutOfStock ? 'bg-primary' : 'bg-gray-300'
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    !v.isOutOfStock
                                      ? 'translate-x-2'
                                      : '-translate-x-2'
                                  }`}
                                />
                              </button>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                              onClick={() => setEditableVariant(v.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => deleteVariantHandler(v)}
                          disabled={
                            updateVariantLoading ||
                            createVariantLoading ||
                            deleteVariantLoading
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Add Form */}
          {variantAddOption && (
            <div className="w-full rounded-lg border border-primary/20 bg-primary/5 p-4 mt-2">
              <h3 className="mb-3 text-sm font-semibold text-primary">
                Add New Variant
              </h3>
              <div className="flex w-full items-start gap-3">
                <div className="w-full">
                  <label
                    htmlFor="new-size"
                    className="mb-1 block text-xs font-semibold text-foreground"
                  >
                    Size <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="new-size"
                    required
                    type="text"
                    placeholder="Ex: Medium"
                    value={createVariantData.size}
                    onChange={(e) =>
                      setCreateVaraintData({
                        ...createVariantData,
                        size: e.target.value,
                      })
                    }
                    className="h-9 bg-white"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="new-price"
                    className="mb-1 block text-xs font-semibold text-foreground"
                  >
                    Price <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="new-price"
                    type="number"
                    required
                    placeholder="Ex: 299"
                    value={createVariantData.price || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCreateVaraintData({
                        ...createVariantData,
                        price: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-9 bg-white"
                  />
                </div>

                <div className="flex h-[60px] items-end pb-0.5">
                  <Button
                    type="button"
                    className="h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={
                      createVariantLoading ||
                      updateVariantLoading ||
                      deleteVariantLoading
                    }
                    onClick={createVariantHandler}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VariantForm;
