import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { PlusCircle, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { upsertItem } from "@/actions/item.action";

export default function ProductFormSheet() {
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [quantity, setQuantity] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setImageFile(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    const fileInput = document.getElementById(
      "profile-image"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    if (imageFile) {
      formData.append("productImage", imageFile);
    }
    toast.promise(upsertItem(formData), {
      loading: `Adding ${name}...`,
      success: "Item added successfully!",
      error: "Failed to add item",
    });
    setLoading(false);
    setName("");
    setDescription("");
    setPrice("0");
    setQuantity("0");
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          <PlusCircle />
          Add Item
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>Add Product</SheetTitle>
          <SheetDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit ea id
            ex maiores.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="relative w-full">
                <div className="h-full w-full overflow-hidden border border-gray-300 bg-gray-100 rounded-lg">
                  {imagePreview ? (
                    <img
                      src={imagePreview as string}
                      alt="Product image"
                      className="h-full w-full max-h-40 object-cover" // Adjusted with max-h-72
                    />
                  ) : (
                    <div className="flex w-full h-40 items-center justify-center text-gray-400">
                      <Upload size={24} />
                    </div>
                  )}
                </div>

                {imagePreview ? (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <Label
                    htmlFor="product-image"
                    className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                  >
                    <PlusCircle size={16} />
                  </Label>
                )}

                <Input
                  id="product-image"
                  name="productImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <span className="text-xs text-gray-500">Product Image</span>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="price">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </form>
        </div>
        <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
          <SheetClose asChild>
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Adding..." : "Insert Product"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
