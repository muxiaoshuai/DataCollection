// ag-grid-enterprise v5.3.1
import { IContextMenuFactory, RowNode, Column } from "ag-grid/main";
export declare class ContextMenuFactory implements IContextMenuFactory {
    private context;
    private popupService;
    private gridOptionsWrapper;
    private init();
    private getMenuItems(node, column, value);
    showMenu(node: RowNode, column: Column, value: any, mouseEvent: MouseEvent): void;
}
