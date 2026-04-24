import FileUploader from '@/components/common/FileUploader';
import { AddCategoryInterface, Category } from '@/redux/api/category';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  setIsOpen: any;
  onSubmitHandler: (data: AddCategoryInterface) => Promise<void>;
  isEdit?: boolean;
  category?: Category;
}

const CreateCategory = ({ setIsOpen, onSubmitHandler, isEdit, category }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddCategoryInterface>({
    defaultValues: {
      name: category?.name || '',
    }
  });
  const thumbnail = watch('thumbnail');

  useEffect(() => {
    if (isEdit && category?.thumbnail) {
      setValue('thumbnail', category.thumbnail as any);
    }
  }, [isEdit, category, setValue]);
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {isEdit ? 'Update Category' : 'Create Category'}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEdit
            ? 'Update the category details below.'
            : 'Create a category to better organize your products.'}
        </p>
      </div>
      
      <form
        className="flex w-full flex-col items-start gap-6"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="w-full space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-foreground"
          >
            Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
            placeholder="Enter category name"
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="w-full space-y-2">
          <label
            htmlFor="thumbnail"
            className="text-sm font-semibold text-foreground"
          >
            Thumbnail <span className="text-destructive">*</span>
          </label>
          <FileUploader
            thumbnail={thumbnail}
            setValue={setValue}
            previewUrl={isEdit ? category?.thumbnail : null}
          />
          <p className="text-xs text-muted-foreground">
            Please upload a transparent background image for better user experience
          </p>
        </div>

        <div className="mt-4 flex w-full items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
          >
            Save Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
