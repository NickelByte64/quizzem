import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import clsx from "clsx";
import { JSX, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Headline } from "~/components";
import { AddButton } from "~/components/actions/add-button";
import { GameRoundContainer } from "~/pages/games/create-game/components/game-rounds/game-round-container";
import { defaultRound } from "~/pages/games/create-game/utils/form-values";
import { GameRoundFormValues } from "~/pages/games/create-game/utils/game-create.types";

export function GameRounds(): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { control } = useFormContext<GameRoundFormValues>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { append, fields, move, remove } = useFieldArray({
    name: "rounds",
    control,
  });

  function handleAddRound() {
    append(defaultRound);
    setTimeout(() => {
      buttonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 0);
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);
    if (over && active && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      move(oldIndex, newIndex);
    }
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-4">
        <Headline as="h3">Runden</Headline>
        <p className="text-right">Gesamt: {fields.length}</p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={clsx("flex flex-col gap-4")}>
            {fields.map((field, i) => (
              <GameRoundContainer
                key={field.id}
                id={field.id}
                index={i}
                overlay={activeId === field.id}
                fields={fields}
                remove={remove}
              />
            ))}

            <DragOverlay>
              {activeId ? (
                <GameRoundContainer
                  id={activeId}
                  index={fields.findIndex((field) => field.id === activeId)}
                  fields={fields}
                  remove={remove}
                />
              ) : null}
            </DragOverlay>

            <AddButton ref={buttonRef} onClick={handleAddRound} />
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}
