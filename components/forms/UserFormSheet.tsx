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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PlusCircle, Upload, X } from "lucide-react";
import { createUser } from "@/actions/user.action";
import { toast } from "sonner";
import { set } from "zod";

export default function UserFormSheet() {
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("USER");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
    if (!name || !email || !role || !password) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("password", password);
    if (imageFile) formData.append("profileImage", imageFile);

    toast.promise(createUser(formData), {
      loading: `Adding ${name}...`,
      success: "User added successfully!",
      error: "Failed to add user",
    });
    setLoading(false);
    setName("");
    setEmail("");
    setRole("USER");
    setPassword("");
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          <PlusCircle />
          Add User
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>Add User</SheetTitle>
          <SheetDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit ea id
            ex maiores.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-24 w-24">
                <div className="h-full w-full overflow-hidden rounded-full border border-gray-300 bg-gray-100">
                  {imagePreview ? (
                    <img
                      src={imagePreview as string}
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
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
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                  >
                    <PlusCircle size={16} />
                  </Label>
                )}
                <Input
                  id="profile-image"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <span className="text-xs text-gray-500">Profile Picture</span>
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
              <Label htmlFor="role">Role</Label>
              <Select
                defaultValue={"USER"}
                value={role}
                onValueChange={(value: string) => setRole(value)}
              >
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">USER</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Adding..." : "Add User"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
