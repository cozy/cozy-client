export default DevTools;
export { default as PanelContent } from "./PanelContent";
declare function DevTools({ panels }: {
    panels: any;
}): JSX.Element;
import { NavSecondaryAction } from "./common";
import { ListGridItem } from "./common";
import useLocalState from "./useLocalState";
export { NavSecondaryAction, ListGridItem, useLocalState };
