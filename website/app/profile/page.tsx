"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { useAuthStore } from "@/hooks/zustand/use-auth-store";
import {
  useUpdateProfile,
  useGetProfile,
  useUploadProfilePicture,
  useChangePassword,
} from "@/hooks/use-auth";

// Helper to resolve profile picture URLs
const resolveImageUrl = (path: string | null | undefined) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (path.startsWith("data:")) return path; 
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8081";
  
  let cleanPath = path;
  if (cleanPath.startsWith("/uploads/")) {
    cleanPath = cleanPath.substring(9);
  }
  if (cleanPath.startsWith("profiles/")) {
    cleanPath = cleanPath.substring(9);
  }
  
  return `${baseUrl}/api/users/uploads/${cleanPath}`;
};

export default function ProfilePage() {
  const router = useRouter();
  
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [hasHydrated, setHasHydrated] = useState(false);

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutate: updateProfileMutation, isPending } = useUpdateProfile();
  const { mutate: fetchProfile, isPending: isFetching } = useGetProfile();
  const { mutate: uploadPictureMutation, isPending: isUploadingPicture } = useUploadProfilePicture();

  // Sync local state when profile changes (e.g. after hydration or update)
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setPhone(profile.phone || "");
      setBloodType(profile.blood_type || "");
      setDateOfBirth(profile.date_of_birth || "");
      setProfilePictureUrl(profile.profile_picture_url || "");
      setPreviewUrl(resolveImageUrl(profile.profile_picture_url));
    }
  }, [profile]);

  // Handle Hydration
  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => setHasHydrated(true));
    if (useAuthStore.persist.hasHydrated()) setHasHydrated(true);
    return () => unsub();
  }, []);

  // Auth Redirect
  useEffect(() => {
    if (hasHydrated && !user) router.push("/");
  }, [hasHydrated, user, router]);

  // Initial Fetch
  useEffect(() => {
    if (user?.token) {
      fetchProfile(user.token, {
        onSuccess: (res) => {
          const freshProfile = {
            full_name: res.user.full_name,
            email: res.user.email,
            phone: res.user.phone,
            date_of_birth: res.user.date_of_birth,
            blood_type: res.user.blood_type,
            profile_picture_url: res.user.profile_picture_url,
          };
          setProfile(freshProfile as any);
        },
      });
    }
  }, [user?.token]);

  // Account security
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const { mutate: changePasswordMutation, isPending: isChangingPasswordPending } = useChangePassword();

  const handleSaveProfile = () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fullName.trim() || !phone.trim() || !bloodType) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!user?.token) return;

    const performUpdate = (picPath?: string) => {
      updateProfileMutation(
        {
          data: { full_name: fullName, phone: phone, blood_type: bloodType as any },
          token: user.token,
        },
        {
          onSuccess: (res) => {
            // Update store with new values
            setProfile({
              ...profile,
              full_name: fullName,
              phone: phone,
              blood_type: bloodType,
              profile_picture_url: picPath || profilePictureUrl,
            } as any);
            
            setSuccessMessage("Profile updated successfully!");
            setIsEditing(false);
            setTimeout(() => setSuccessMessage(null), 3000);
          },
          onError: (err: any) => setErrorMessage(err?.response?.data?.message || "Failed to update profile."),
        }
      );
    };

    const fileInput = document.getElementById("profile-upload") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      uploadPictureMutation(
        { file, token: user.token },
        {
          onSuccess: (res) => {
            const uploadedUrl = res.profile_picture_url;
            setProfilePictureUrl(uploadedUrl);
            setPreviewUrl(resolveImageUrl(uploadedUrl));
            performUpdate(uploadedUrl);
          },
          onError: (err: any) => setErrorMessage(err?.response?.data?.message || "Image upload failed."),
        }
      );
    } else {
      performUpdate();
    }
  };

  if (!hasHydrated) return null; // Wait for hydration silently

  if (!user) return null;

  const handleLogout = () => {
    clearAuth();
    router.push("/");
  };

  const displayName = fullName || user.email || "User";
  const initials = displayName.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="h-20" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-none shadow-sm overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md">
          <div className="h-32 bg-linear-to-r from-[#670017] to-[#a0112c]" />
          <CardContent className="relative pt-0 pb-8 px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 mb-8 gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-[#f7f2f8] shadow-lg overflow-hidden flex items-center justify-center">
                    {previewUrl ? (
                      <img src={previewUrl} alt={displayName} className="w-full h-full object-cover" onError={() => setPreviewUrl(null)} />
                    ) : (
                      <span className="text-4xl font-black text-[#670017]">{initials}</span>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-[#f8f9fa] transition-all border border-gray-100 transform hover:scale-110">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#670017" strokeWidth="2.5" className="w-5 h-5">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      <input id="profile-upload" type="file" className="hidden" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => setPreviewUrl(ev.target?.result as string);
                          reader.readAsDataURL(file);
                        }
                      }} />
                    </label>
                  )}
                </div>
                <div className="pb-2">
                  <h1 className="text-3xl font-serif font-bold text-[#1c1b1f] tracking-tight">{displayName}</h1>
                  <p className="text-[#8c7070] font-sans font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-3">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="rounded-full bg-[#670017] hover:bg-[#4d0011] px-8 font-bold shadow-lg shadow-[#670017]/20 transition-all h-12">
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSaveProfile} disabled={isPending || isUploadingPicture} className="rounded-full bg-green-600 hover:bg-green-700 px-8 font-bold shadow-lg shadow-green-600/20 transition-all h-12">
                      {isPending || isUploadingPicture ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outline" onClick={() => { setIsEditing(false); setPreviewUrl(resolveImageUrl(profilePictureUrl)); }} className="rounded-full border-[#e0bfbf] text-[#8c7070] px-8 font-bold h-12">
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>

            {(errorMessage || successMessage) && (
              <div className={`mb-8 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${errorMessage ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                {errorMessage ? "⚠️ " : "✅ "}
                {errorMessage || successMessage}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center gap-3 border-b border-[#f1ecf2] pb-4">
                  <div className="w-1.5 h-6 bg-[#670017] rounded-full" />
                  <h3 className="text-xl font-serif font-bold text-[#670017]">Personal Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8c7070] px-1">Full Name</Label>
                    {isEditing ? (
                      <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-xl border-[#e0bfbf] h-12 bg-white/50 focus:bg-white transition-all shadow-xs" />
                    ) : (
                      <p className="text-[#1c1b1f] font-bold text-lg px-1">{fullName || "—"}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8c7070] px-1">Phone Number</Label>
                    {isEditing ? (
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl border-[#e0bfbf] h-12 bg-white/50 focus:bg-white transition-all shadow-xs" />
                    ) : (
                      <p className="text-[#1c1b1f] font-bold text-lg px-1">{phone || "—"}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8c7070] px-1">Blood Type</Label>
                    {isEditing ? (
                      <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} className="w-full h-12 rounded-xl border border-[#e0bfbf] px-4 font-sans font-bold bg-white/50 focus:bg-white outline-none focus:ring-2 focus:ring-[#670017] transition-all shadow-xs">
                        <option value="">Select Blood Type</option>
                        {["A_POSITIVE", "A_NEGATIVE", "B_POSITIVE", "B_NEGATIVE", "AB_POSITIVE", "AB_NEGATIVE", "O_POSITIVE", "O_NEGATIVE"].map(bt => (
                          <option key={bt} value={bt}>{bt.replace("_", " ")}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="flex items-center gap-2 px-1">
                         <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600">🩸</span>
                         <p className="text-[#1c1b1f] font-bold text-lg">{bloodType ? bloodType.replace("_", " ") : "Not set"}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-[#f1ecf2] pb-4">
                  <div className="w-1.5 h-6 bg-[#670017] rounded-full" />
                  <h3 className="text-xl font-serif font-bold text-[#670017]">Security</h3>
                </div>

                <div className="bg-[#fdf8fd] rounded-3xl p-6 border border-[#f1ecf2] space-y-4">
                  {!isChangingPassword ? (
                    <div className="text-center space-y-4 py-2">
                      <p className="text-xs text-[#8c7070] font-sans font-medium px-4 leading-relaxed">Update your account password to keep your data secure.</p>
                      <Button onClick={() => setIsChangingPassword(true)} variant="outline" className="w-full rounded-full border-[#e0bfbf] text-[#670017] font-black uppercase text-[10px] tracking-widest h-12 hover:bg-white">
                        Change Password
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                      <Input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="rounded-xl border-[#e0bfbf] bg-white h-11" />
                      <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="rounded-xl border-[#e0bfbf] bg-white h-11" />
                      <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="rounded-xl border-[#e0bfbf] bg-white h-11" />
                      {passwordError && <p className="text-[10px] text-red-600 font-black uppercase px-1">{passwordError}</p>}
                      <div className="flex gap-2">
                        <Button onClick={() => setIsChangingPassword(false)} variant="ghost" className="flex-1 rounded-full font-bold text-xs h-10">Cancel</Button>
                        <Button onClick={() => {}} className="flex-1 rounded-full bg-[#670017] font-bold text-xs h-10">Save</Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button onClick={handleLogout} variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full font-black uppercase text-[10px] tracking-[0.2em] h-12 transition-all">
                  Sign Out Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
