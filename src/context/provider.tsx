import DefaultProfileData from "@/constants/default-profile";
import { Profile } from "@/types/user";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ContextDef {
  data: Profile;
  setData: Dispatch<SetStateAction<Profile>>;
}

export const ProfileContext = createContext<ContextDef>({
  data: DefaultProfileData,
  setData: () => {},
});

function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DefaultProfileData);
  return (
    <ProfileContext.Provider value={{ data: profile, setData: setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;
