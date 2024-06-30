"use client";

import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useImmer } from "use-immer";
import { useData } from "@/services/dataProvider/DataProvider";
import { useRouter } from "next/navigation";
import { dynamicRoutePage, PAGE_ROUTE } from "@/interface/route";
import ButtonLink, { Button } from "@/components/Button";
import MultiSelect from "@/components/MultiSelect";
import { Space } from "@/graphql/__generated__/graphql";
import { LoadingCircle } from "@/components/LoadingCircle";

const CREATE_TEAM =
  gql(`mutation createTeam($name: String!, $spaceId: String!, $sportId: String!, $playerIds: [String!]!) {
    createTeam(name: $name, spaceId: $spaceId, sportId: $sportId, playerIds: $playerIds) {
        name
        spaceId
        sportId
    }
}`);



interface TeamForm {
  name?: string;
  spaceId?: string;
  sportId?: string;
  playerIds?: string[];
}

const CreateTeamPage = ({
  params: { space },
}: {
  params: { space: string };
}) => {
  const [createTeam, { data, loading, error }] = useMutation(CREATE_TEAM);
  const { getDetails } = useData();
  const [spaceData, updateSpace] = useImmer<Space | undefined>(undefined);
  const [sportForm, updateSportForm] = useImmer<TeamForm>({});
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();

  const handleTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateSportForm((draft) => {
      draft.name = value;
    });
  };

  const handleSportId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    updateSportForm((draft) => {
      draft.sportId = value;
    });
  };

  const handleUserSelection = (selected: string[]) => {
    updateSportForm((draft) => {
      draft.playerIds = selected;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!spaceData) return;

    try {
      const response = await createTeam({
        variables: {
          spaceId: spaceData.id,
          name: sportForm.name,
          sportId: sportForm.sportId,
          playerIds: sportForm.playerIds,
        },
      });
      console.log("Team created successfully:", response.data);
      router.push(dynamicRoutePage(PAGE_ROUTE.SPACE_TEAM, { space: space }));
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const spaceDetails = await getDetails(space);
        spaceDetails && updateSpace(spaceDetails);
      } catch (error) {
        console.error("Error fetching space:", error);
      }
      setLoadingData(false);
    };

    fetchSpace();
  }, []);

  if (loadingData) return <LoadingCircle />;

  return (
    <div>
      <div className="flex justify-between mb-4 items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Create Team</h1>

        <div className="flex justify-between ">
          <Button
            className="mr-2"
            variant="outlined"
            color="black"
            onClick={() => router.push("/create-sport")}
          >
            Create Sport
          </Button>
          <Button
            className=" ml-2"
            variant="outlined"
            color="black"
            onClick={() => router.push("/create-user")}
          >
            Create Player
          </Button>
        </div>
      </div>
      <div className="mx-auto p-4 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid gird-cols-1  md:grid-cols-2 gap-4 h-full">
            <div className="h-full">
              <div className="mb-4">
                <label htmlFor="team_name" className="block mb-2 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="team_name"
                  value={sportForm.name || ""}
                  onChange={handleTeamName}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              {spaceData?.sports && (
                <div className="">
                  <label htmlFor="sportId" className="block mb-2 font-semibold">
                    Sport
                  </label>
                  <select
                    id="sportId"
                    value={sportForm.sportId || ""}
                    onChange={handleSportId}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select Sport</option>
                    {spaceData.sports.map((sport: any) => (
                      <option key={sport.id} value={sport.id}>
                        {sport.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            {spaceData?.players && (
              <div className="mb-4">
                <label htmlFor="users" className="block mb-2 font-semibold">
                  Add Player
                </label>
                <div className="min-h-60">
                <MultiSelect
                
                  options={
                    spaceData?.players.map((player: any) => ({
                      id: player.id,
                      name: player.name,
                    })) || []
                  }
                  selectedOptions={sportForm.playerIds || []}
                  onSelectionChange={handleUserSelection}
                />
              </div>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <ButtonLink
              link={PAGE_ROUTE.SPACE + "/" + space}
              className="w-full text-center mt-4"
              variant="outlined"
            >
              Cancel
            </ButtonLink>
            <Button
              type="submit"
              className="w-full text-center mt-4"
              variant="filled"
              color="blue"
            >
              Create Team
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamPage;
