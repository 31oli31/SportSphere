'use client'
import {gql} from "@/graphql/__generated__";
import {useQuery} from "@apollo/client";
import BreadcrumbAuto from "@/components/BreadcrumbAuto";
import {useRouter} from "next/navigation";

const GET_PLAYERS = gql(`query players {
    players {
        id
        name
    }
}`);

const PlayersPage = () => {
    const {data} = useQuery(GET_PLAYERS);
const router = useRouter();
  return (
    <div>
      <BreadcrumbAuto/>
        <button type="button"
                onClick={() => router.push('/player/create')}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create Player
        </button>
      <ul>
        {data?.players.map((player) => (
          <li key={player.id}>
              <a>{player.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersPage;
