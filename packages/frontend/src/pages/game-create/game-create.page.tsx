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
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Button, Headline, Layout } from "~/components";
import { AddButton } from "~/pages/game-create/components/add-button";
import { GameRoundContainer } from "~/pages/game-create/components/game-round-container";
import { defaultRound } from "~/pages/game-create/utils/form-values";

export function GameCreatePage(): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      rounds: [defaultRound],
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { control, handleSubmit } = form;
  const { append, remove, fields, move } = useFieldArray({
    name: "rounds",
    control,
  });

  const onSubmit: SubmitHandler<{}> = (data) => {
    console.log(data); // TODO send to backend
  };

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
    <Layout>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Headline>Spiel erstellen</Headline>

              <Button className="mb-4">Spiel erstellen</Button>

              <div className={clsx("flex flex-col gap-4")}>
                {fields.map((field, i) => (
                  <GameRoundContainer
                    key={field.id}
                    id={field.id}
                    index={i}
                    fields={fields}
                    remove={remove}
                    overlay={activeId === field.id}
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
              <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
            </form>
          </FormProvider>
        </SortableContext>
      </DndContext>
    </Layout>
  );
}
