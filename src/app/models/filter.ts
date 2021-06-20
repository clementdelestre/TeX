export interface Filter {
    field: string;
    operator: FilterOperatorList;
    value: any;
}

export interface FilterOperator {
    operator: string;
}

export interface FilterAvailableData {
    year: string[],
    genre: string[]
}

export enum FilterOperatorList {
    "contains" = "contains",
    "doesnotcontain" = "doesnotcontain",
    "is" = "is",
    "isnot" = "isnot",
    "startswith" = "startswith",
    "endswith" = "endswith",
    "greaterthan" = "greaterthan",
    "lessthan" = "lessthan",
    "after" = "after",
    "before" = "before",
    "inthelast" = "inthelast",
    "notinthelast" = "notinthelast",
    "true" = "true",
    "false" = "false",
    "between" = "between"
}

export const FilterFieldList = [
    "year",
    "genre"
]
