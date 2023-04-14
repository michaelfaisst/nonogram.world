import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FillState } from "../utils";
import Cell, { type Props } from "./";

describe("Cell", () => {
    afterEach(cleanup);

    const props: Props = {
        index: 0,
        fillState: FillState.Empty,
        gridWidth: 10,
        onMouseDown: vi.fn(),
        onMouseUp: vi.fn(),
        onMouseEnter: vi.fn(),
        onMouseOver: vi.fn()
    };

    it("renders without errors", () => {
        render(<Cell {...props} />);
    });

    it.each([FillState.Empty, FillState.Filled])(
        "renders the cell without X if fillState is %i",
        (fillState) => {
            const { container } = render(
                <Cell {...props} fillState={fillState} />
            );
            expect(container.querySelector("svg")).toBeNull();
        }
    );

    it("renders the cell with correct background color if cell is filled", () => {
        const { container } = render(
            <Cell {...props} fillState={FillState.Filled} />
        );
        expect(container.firstElementChild?.classList.toString()).toMatch(
            "bg-slate-400"
        );
    });

    it("renders the cell with X icon if fill state is crossed", () => {
        const { container } = render(
            <Cell {...props} fillState={FillState.Crossed} />
        );
        expect(container.querySelector("svg")).not.toBeNull();
    });

    it("calls onMouseDown when the cell is clicked", () => {
        const { container } = render(<Cell {...props} />);
        fireEvent.mouseDown(container.firstChild!);
        expect(props.onMouseDown).toHaveBeenCalledTimes(1);
    });

    it("calls onMouseUp when the mouse is released", () => {
        const { container } = render(<Cell {...props} />);
        fireEvent.mouseUp(container.firstChild!);
        expect(props.onMouseUp).toHaveBeenCalledTimes(1);
    });

    it("calls onMouseEnter when the mouse enters the cell", () => {
        const { container } = render(<Cell {...props} />);
        fireEvent.mouseEnter(container.firstChild!);
        expect(props.onMouseEnter).toHaveBeenCalledTimes(1);
    });
});
