"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfo, useAuthStore } from "@/hooks/zustand/use-auth-store";
import { useUpdateProfile, useGetProfile, useUploadProfilePicture } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [bloodType, setBloodType] = useState(profile?.blood_type || "");
  const [dateOfBirth, setDateOfBirth] = useState(profile?.date_of_birth || "");
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    profile?.profile_picture_url || "",
  );

  // API mutation
  const { mutate: updateProfileMutation, isPending } = useUpdateProfile();
  const { mutate: fetchProfile, isPending: isFetchingProfile } = useGetProfile();
  const { mutate: uploadPictureMutation, isPending: isUploadingPicture } =
    useUploadProfilePicture();

  // Profile picture upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(profilePictureUrl);

  // Redirect to home if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    // Fetch the full profile data when page loads
    if (user.token) {
      fetchProfile(user.token, {
        onSuccess: (response) => {
          // Update store and form state with fetched profile
          const mappedProfile = {
            full_name: response.fullName,
            email: response.email,
            phone: response.phoneNumber,
            date_of_birth: response.dateOfBirth,
          };

          setProfile(mappedProfile as any);
          setFullName(response.fullName || "");
          setPhone(response.phoneNumber || "");
          setDateOfBirth(response.dateOfBirth || "");
        },
        onError: (error: any) => {
          console.error("Failed to fetch profile:", error);
          // Don't show error to user, just log it
        },
      });
    }
  }, [user, router, fetchProfile, setProfile]);

  const handleSaveProfile = () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const userToken = user?.token;
    if (!userToken) {
      setErrorMessage("Authentication token missing. Please log in again.");
      return;
    }

    // If there's a file to upload, upload it first
    if (selectedFile) {
      uploadPictureMutation(
        { file: selectedFile, token: userToken },
        {
          onSuccess: (response) => {
            // Update profile picture URL
            setProfilePictureUrl(response.profilePictureUrl);
            setProfile({
              ...profile,
              full_name: fullName,
              phone: phone,
              blood_type: bloodType,
              profile_picture_url: response.profilePictureUrl,
            } as any);

            // Then update other profile fields
            updateProfileMutation(
              {
                data: {
                  full_name: fullName,
                  phone: phone,
                  blood_type: bloodType as any,
                },
                token: userToken,
              },
              {
                onSuccess: (response) => {
                  setSuccessMessage(
                    response.message || "Profile updated successfully!",
                  );
                  setIsEditing(false);
                  setSelectedFile(null);

                  setTimeout(() => {
                    setSuccessMessage(null);
                  }, 3000);
                },
                onError: (error: any) => {
                  const errorMsg =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to update profile. Please try again.";
                  setErrorMessage(errorMsg);
                },
              },
            );
          },
          onError: (error: any) => {
            const errorMsg =
              error?.response?.data?.message ||
              error?.message ||
              "Failed to upload profile picture. Please try again.";
            setErrorMessage(errorMsg);
          },
        },
      );
    } else {
      // No file upload, just update profile fields
      updateProfileMutation(
        {
          data: {
            full_name: fullName,
            phone: phone,
            blood_type: bloodType as any,
          },
          token: userToken,
        },
        {
          onSuccess: (response) => {
            setProfile({
              ...profile,
              full_name: fullName,
              phone: phone,
              blood_type: bloodType,
            } as any);

            setSuccessMessage(
              response.message || "Profile updated successfully!",
            );
            setIsEditing(false);

            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          },
          onError: (error: any) => {
            const errorMsg =
              error?.response?.data?.message ||
              error?.message ||
              "Failed to update profile. Please try again.";
            setErrorMessage(errorMsg);
          },
        },
      );
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please select a valid image file.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size must be less than 5MB.");
        return;
      }

      setSelectedFile(file);
      setErrorMessage(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    clearAuth();
    router.push("/");
  };

  if (!user) {
    return null;
  }

  const displayName = profile?.full_name || user.email || "User";
  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5f1f3] via-white to-[#faf7f9]">
      {/* Header spacing for fixed navbar */}
      <div className="h-24" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <Card className="border-0 shadow-lg mb-6 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                {/* Avatar with upload overlay */}
                <div className="relative group">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={displayName}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#670017]"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#670017] to-[#8c1127] flex items-center justify-center border-4 border-[#670017]">
                      <span className="text-3xl font-black text-white">{initials}</span>
                    </div>
                  )}

                  {isEditing && (
                    <label className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        className="w-6 h-6"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div>
                  <h1 className="text-3xl font-serif italic font-bold text-[#670017] mb-1">
                    {displayName}
                  </h1>
                  <p className="text-gray-600 mb-3">{user.email}</p>
                  {selectedFile && isEditing && (
                    <p className="text-xs text-green-600 mb-2 font-medium">
                      ✓ New image selected: {selectedFile.name}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#670017]/10 text-[#670017] px-3 py-1 rounded-full">
                      {user.role || "DONOR"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#670017] hover:bg-[#8c1127] text-white rounded-full font-bold"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isPending || isUploadingPicture}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-full font-bold"
                    >
                      {isPending || isUploadingPicture
                        ? "Saving..."
                        : "Save Changes"}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setErrorMessage(null);
                        setSuccessMessage(null);
                        setSelectedFile(null);
                        setPreviewUrl(profilePictureUrl);
                      }}
                      variant="outline"
                      className="rounded-full font-bold"
                      disabled={isPending || isUploadingPicture}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium">
            ✓ {successMessage}
          </div>
        )}

        {/* Profile Details Card */}
        <Card className="border-0 shadow-lg mb-6 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#670017]">Profile Information</CardTitle>
            <CardDescription>
              {isEditing ? "Edit your profile details below" : "View your profile information"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#584141]">Full Name</Label>
                {isEditing ? (
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="border-[#e0bfbf] focus:border-[#670017]"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                    {fullName || "Not set"}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#584141]">Email Address</Label>
                <div className="p-3 bg-gray-50 rounded-lg text-gray-700">{user.email}</div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#584141]">Phone Number</Label>
                {isEditing ? (
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="border-[#e0bfbf] focus:border-[#670017]"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                    {phone || "Not set"}
                  </div>
                )}
              </div>

              {/* Blood Type */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#584141]">Blood Type</Label>
                {isEditing ? (
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e0bfbf] rounded-lg focus:outline-none focus:border-[#670017] focus:ring-1 focus:ring-[#670017]"
                  >
                    <option value="">Select blood type</option>
                    <option value="O_POSITIVE">O+</option>
                    <option value="O_NEGATIVE">O-</option>
                    <option value="A_POSITIVE">A+</option>
                    <option value="A_NEGATIVE">A-</option>
                    <option value="B_POSITIVE">B+</option>
                    <option value="B_NEGATIVE">B-</option>
                    <option value="AB_POSITIVE">AB+</option>
                    <option value="AB_NEGATIVE">AB-</option>
                  </select>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                    {bloodType ? bloodType.replace("_", "") : "Not set"}
                  </div>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#584141]">Date of Birth</Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="border-[#e0bfbf] focus:border-[#670017]"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                    {dateOfBirth
                      ? new Date(dateOfBirth).toLocaleDateString()
                      : "Not set"}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#670017]">Account Actions</CardTitle>
          </CardHeader>

          <CardContent>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white rounded-full font-bold w-full sm:w-auto"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
