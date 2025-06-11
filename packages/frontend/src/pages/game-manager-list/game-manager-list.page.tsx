import { GameDto, PageableDto } from "@quizzem/common";
import { RiDeleteBinFill, RiPencilFill } from "@remixicon/react";
import { JSX, useState } from "react";
import { Link } from "react-router";
import { Headline, IconButton, Layout } from "~/components";
import { DeleteModal } from "~/pages/game-manager-list/components/delete-modal";
import { useGetRemote } from "~/utils";

export function GameManagerListPage(): JSX.Element {
  const { data } = useGetRemote<PageableDto<GameDto>>("game");

  const [openModal, setOpenModal] = useState(false);
  const [game, setGame] = useState<GameDto | null>(null);

  return (
    <Layout>
      <Headline>Game Manager List</Headline>
      <ul className="list">
        {data?.data.map((game, i) => (
          <li
            key={game.id}
            className="list-row flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className="font-bold">{game.name}</span>
            </div>
            <div className="flex gap-2">
              <Link to={`/game-manager/${game.id}`}>
                <IconButton>
                  <RiPencilFill />
                </IconButton>
              </Link>
              <IconButton
                variant="error"
                onClick={() => {
                  setOpenModal(true);
                  setGame(game);
                }}
              >
                <RiDeleteBinFill />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>

      <DeleteModal game={game} open={openModal} setOpen={setOpenModal} />
    </Layout>
  );
}
