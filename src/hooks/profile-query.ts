import { ProfileContext } from "@/context/provider";
import { TokenResponse } from "@react-oauth/google";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

async function fetchProfile(tokenResponse: TokenResponse | undefined) {
  if (tokenResponse) {
    const data = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
          Accept: "application/json",
        },
      }
    ).then((res) => res.json());
    return data;
  }
}

function useProfileQuery(tokenResponse: TokenResponse | undefined) {
  const context = useContext(ProfileContext);
  const { status, data } = useQuery({
    queryKey: ["profile", tokenResponse],
    queryFn: () => fetchProfile(tokenResponse),
    enabled: !!tokenResponse,
  });
  if (status === "success") {
    context.setData(data);
  }

  return { status };
}

export { useProfileQuery };
