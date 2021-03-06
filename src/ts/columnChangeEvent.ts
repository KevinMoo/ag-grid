
import {Column} from "./entities/column";
import {ColumnGroup} from "./entities/columnGroup";
import {Events} from "./events";

export class ColumnChangeEvent {

    private type: string;
    // set if event impacts one column
    private column: Column;
    // se if event impacts multiple columns
    private columns: Column[];
    private columnGroup: ColumnGroup;
    private toIndex: number;
    private finished: boolean;
    private visible: boolean;
    private pinned: string;

    constructor(type: string) {
        this.type = type;
    }

    public toString(): string {
        var result = 'ColumnChangeEvent {type: ' + this.type;
        if (this.column) { result += ', column: ' + this.column.getColId(); }
        if (this.columnGroup) { result += ', columnGroup: ' + this.columnGroup.getColGroupDef() ? this.columnGroup.getColGroupDef().headerName : '(not defined]'; }
        if (this.toIndex) { result += ', toIndex: ' + this.toIndex; }
        if (this.visible) { result += ', visible: ' + this.visible; }
        if (this.pinned) { result += ', pinned: ' + this.pinned; }
        if (typeof this.finished == 'boolean') { result += ', finished: ' + this.finished; }
        result += '}';
        return result;
    }

    public withPinned(pinned: string): ColumnChangeEvent {
        this.pinned = pinned;
        return this;
    }

    public withVisible(visible: boolean): ColumnChangeEvent {
        this.visible = visible;
        return this;
    }

    public isVisible(): boolean {
        return this.visible;
    }

    public getPinned(): string {
        return this.pinned;
    }

    public withColumn(column: Column): ColumnChangeEvent {
        this.column = column;
        return this;
    }

    public withColumns(columns: Column[]): ColumnChangeEvent {
        this.columns = columns;
        return this;
    }

    public withFinished(finished: boolean): ColumnChangeEvent {
        this.finished = finished;
        return this;
    }

    public withColumnGroup(columnGroup: ColumnGroup): ColumnChangeEvent {
        this.columnGroup = columnGroup;
        return this;
    }

    public withToIndex(toIndex: number): ColumnChangeEvent {
        this.toIndex = toIndex;
        return this;
    }

    public getToIndex(): number  {
        return this.toIndex;
    }

    public getType(): string {
        return this.type;
    }

    public getColumn(): Column {
        return this.column;
    }

    public getColumns(): Column[] {
        return this.columns;
    }

    public getColumnGroup(): ColumnGroup {
        return this.columnGroup;
    }

    public isPinnedPanelVisibilityImpacted(): boolean {
        return this.type ===  Events.EVENT_COLUMN_EVERYTHING_CHANGED ||
            this.type ===  Events.EVENT_COLUMN_GROUP_OPENED ||
            this.type ===  Events.EVENT_COLUMN_VISIBLE ||
            this.type ===  Events.EVENT_PIVOT_VALUE_CHANGED ||
            this.type ===  Events.EVENT_COLUMN_PIVOT_MODE_CHANGED ||
            this.type ===  Events.EVENT_COLUMN_PINNED
    }

    public isContainerWidthImpacted(): boolean {
        return this.type ===  Events.EVENT_COLUMN_EVERYTHING_CHANGED ||
            this.type ===  Events.EVENT_COLUMN_GROUP_OPENED ||
            this.type ===  Events.EVENT_COLUMN_VISIBLE ||
            this.type ===  Events.EVENT_COLUMN_RESIZED ||
            this.type ===  Events.EVENT_COLUMN_PINNED ||
            this.type ===  Events.EVENT_PIVOT_VALUE_CHANGED ||
            this.type ===  Events.EVENT_COLUMN_PIVOT_MODE_CHANGED ||
            this.type ===  Events.EVENT_COLUMN_ROW_GROUP_CHANGED;
    }

    public isIndividualColumnResized(): boolean {
        return this.type === Events.EVENT_COLUMN_RESIZED && this.column !== undefined && this.column !== null;
    }

    public isFinished(): boolean {
        return this.finished;
    }

}
