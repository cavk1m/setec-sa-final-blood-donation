"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserInfo, useAuthStore } from "@/hooks/zustand/use-auth-store";
import {
  useUpdateProfile,
  useGetProfile,
  useUploadProfilePicture,
  useChangePassword,
} from "@/hooks/use-auth";
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
  const { mutate: fetchProfile, isPending: isFetchingProfile } =
    useGetProfile();
  const { mutate: uploadPictureMutation, isPending: isUploadingPicture } =
    useUploadProfilePicture();

  // Profile picture upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(profilePictureUrl);

  // Password change state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const {
    mutate: changePasswordMutation,
    isPending: isChangingPasswordPending,
  } = useChangePassword();

  const handleChangePassword = () => {
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword.trim()) {
      setPasswordError("Current password is required.");
      return;
    }
    if (!newPassword.trim()) {
      setPasswordError("New password is required.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    const userToken = user?.token;
    if (!userToken) {
      setPasswordError("Authentication token missing.");
      return;
    }

    changePasswordMutation(
      {
        data: {
          current_password: currentPassword,
          new_password: newPassword,
        },
        token: userToken,
      },
      {
        onSuccess: (response) => {
          setPasswordSuccess(
            response.message || "Password changed successfully!",
          );
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setIsChangingPassword(false);

          setTimeout(() => {
            setPasswordSuccess(null);
          }, 3000);
        },
        onError: (error: any) => {
          const errorMsg =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to change password.";
          setPasswordError(errorMsg);
        },
      },
    );
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    // Fetch the full profile data when user changes (login/registration)
    if (user.token) {
      fetchProfile(user.token, {
        onSuccess: (response) => {
          console.log("Profile fetched:", response);

          // ✅ FIX: Extract from response.user and use snake_case
          const mappedProfile = {
            full_name: response.user.full_name,
            email: response.user.email,
            phone: response.user.phone,
            date_of_birth: response.user.date_of_birth,
            profile_picture_url: response.user.profile_picture_uri, // ← Note: backend uses profile_picture_uri
          };

          setProfile(mappedProfile as any);
          setFullName(response.user.full_name || "");
          setPhone(response.user.phone || "");
          setDateOfBirth(response.user.date_of_birth || "");

          setPreviewUrl(response.user.profile_picture_uri || "");
        },
        onError: (error: any) => {
          console.error("Failed to fetch profile:", error);
        },
      });
    }
  }, [user, router]); // ← Remove fetchProfile and setProfile

  useEffect(() => {
    if (profile?.profile_picture_url) {
      setProfilePictureUrl(profile.profile_picture_url);
      setPreviewUrl(profile.profile_picture_url);
    }
  }, [profile?.profile_picture_url]);

  // const handleSaveProfile = () => {
  //   setErrorMessage(null);
  //   setSuccessMessage(null);

  //   const userToken = user?.token;
  //   if (!userToken) {
  //     setErrorMessage("Authentication token missing. Please log in again.");
  //     return;
  //   }
  const handleSaveProfile = () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // ✅ ADD THIS VALIDATION
    if (!fullName.trim()) {
      setErrorMessage("Full name is required.");
      return;
    }

    if (!phone.trim()) {
      setErrorMessage("Phone number is required.");
      return;
    }

    // ✅ ADD THIS VALIDATION FOR BLOOD TYPE
    if (!bloodType || bloodType === "") {
      setErrorMessage("Please select a blood type.");
      return;
    }

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
            setPreviewUrl(response.profilePictureUrl);

            if (user?.token) {
              fetchProfile(user.token, {
                onSuccess: (profileResponse) => {
                  console.log("🔍 fetchProfile response:", profileResponse);
                  console.log(
                    "🔍 profile_picture_uri:",
                    profileResponse.user.profile_picture_uri,
                  );
                  const updatedProfile = {
                    full_name: profileResponse.user.full_name,
                    email: profileResponse.user.email,
                    phone: profileResponse.user.phone,
                    date_of_birth: profileResponse.user.date_of_birth,
                    profile_picture_url:
                      profileResponse.user.profile_picture_uri,
                  };
                  // ✅ Make sure this updates the store (triggers localStorage)
                  setProfile(updatedProfile as any);

                  // ✅ Also sync local state
                  setPreviewUrl(profileResponse.user.profile_picture_uri || "");
                  setProfilePictureUrl(
                    profileResponse.user.profile_picture_uri || "",
                  );
                },
              });
            }

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
                      <span className="text-3xl font-black text-white">
                        {initials}
                      </span>
                    </div>
                  )}

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
            <CardTitle className="text-[#670017]">
              Profile Information
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Edit your profile details below"
                : "View your profile information"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#584141]">
                  Full Name
                </Label>
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
                <Label className="text-sm font-bold text-[#584141]">
                  Email Address
                </Label>
                <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                  {user.email}
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#584141]">
                  Phone Number
                </Label>
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
                <Label className="text-sm font-bold text-[#584141]">
                  Blood Type
                </Label>
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
                <Label className="text-sm font-bold text-[#584141]">
                  Date of Birth
                </Label>
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
        {/* Account Actions Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#670017]">Account Actions</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Change Password Section */}
            {!isChangingPassword ? (
              <Button
                onClick={() => setIsChangingPassword(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold w-full"
              >
                Change Password
              </Button>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-bold text-[#584141]">
                    Current Password
                  </Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="border-[#e0bfbf] focus:border-[#670017]"
                  />
                </div>

                <div>
                  <Label className="text-sm font-bold text-[#584141]">
                    New Password
                  </Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="border-[#e0bfbf] focus:border-[#670017]"
                  />
                </div>

                <div>
                  <Label className="text-sm font-bold text-[#584141]">
                    Confirm New Password
                  </Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="border-[#e0bfbf] focus:border-[#670017]"
                  />
                </div>

                {passwordError && (
                  <p className="text-sm text-red-600 font-medium">
                    {passwordError}
                  </p>
                )}
                {passwordSuccess && (
                  <p className="text-sm text-green-600 font-medium">
                    ✓ {passwordSuccess}
                  </p>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleChangePassword}
                    disabled={isChangingPasswordPending}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full font-bold flex-1"
                  >
                    {isChangingPasswordPending
                      ? "Changing..."
                      : "Change Password"}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsChangingPassword(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setPasswordError(null);
                      setPasswordSuccess(null);
                    }}
                    variant="outline"
                    className="rounded-full font-bold flex-1"
                    disabled={isChangingPasswordPending}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Sign Out Button */}
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white rounded-full font-bold w-full"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
