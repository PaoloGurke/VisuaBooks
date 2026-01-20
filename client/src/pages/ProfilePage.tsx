import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface ProfilePageProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProfilePage({
  userName,
  setUserName,
  profileImage,
  setProfileImage,
}: ProfilePageProps) {
  const [image, setImage] = useState(profileImage);
  const [fileName, setFileName] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(userName);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    setImage(profileImage);
    setTempUsername(userName);
  }, [profileImage, userName]);

  // Trigger file input click
  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = reader.result as string;
        setImage(newImage);
        setProfileImage(newImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmUsername = () => {
    if (tempUsername.trim() !== "") {
      setUserName(tempUsername.trim());
      setIsEditingUsername(false);
    }
  };

  const handleCancelUsername = () => {
    setTempUsername(userName);
    setIsEditingUsername(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {!isEditingUsername ? (
        <>
          {/* Profile image */}
          <div
            className="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center cursor-pointer"
            onClick={handleChooseFile}
          >
            {image ? (
              <img src={image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-white dark:bg-gray-700 rounded-full" />
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChangeImage}
            className="hidden"
          />

          {/* Choose file button */}
          <Button onClick={handleChooseFile}>Choose File</Button>
          {fileName && (
            <span className="text-sm text-gray-600 dark:text-gray-300">{fileName}</span>
          )}

          {/* Username */}
          <p
            className="text-lg font-medium cursor-pointer underline"
            onClick={() => setIsEditingUsername(true)}
          >
            {userName}
          </p>

          {/* Go Back & Confirm buttons */}
          <div className="flex gap-4">
            <Button onClick={() => navigate("/")}>Go Back</Button>
            <Button onClick={() => navigate("/")} variant="secondary">
              Confirm
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Editing username */}
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-64 text-black placeholder-gray-500"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            autoFocus
          />

          {/* Buttons for confirm/cancel */}
          <div className="flex gap-4 mt-2">
            <Button onClick={handleCancelUsername}>Go Back</Button>
            <Button onClick={handleConfirmUsername} variant="secondary">
              Confirm
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
