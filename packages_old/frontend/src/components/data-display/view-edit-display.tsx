import { RiCloseFill, RiPencilFill } from "@remixicon/react";
import { JSX, useState } from "react";
import { IconButton } from "~/components/actions";
import { Headline } from "~/components/typography";

type ViewEditDisplayProps = {
  headline: string;
  ViewMode: JSX.Element;
  EditMode: JSX.Element;
};

export function ViewEditDisplay(
  props: Readonly<ViewEditDisplayProps>
): JSX.Element {
  const { headline, ViewMode, EditMode } = props;

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Headline as={"h4"} defaultMargin={false}>
          {headline}
        </Headline>
        <IconButton onClick={() => setIsEditMode((prev) => !prev)}>
          {isEditMode ? <RiCloseFill /> : <RiPencilFill />}
        </IconButton>
      </div>

      {isEditMode ? EditMode : ViewMode}
    </>
  );
}
