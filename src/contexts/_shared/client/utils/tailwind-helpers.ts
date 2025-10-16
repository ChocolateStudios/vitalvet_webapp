const colsMap: { [key: number]: string } = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
};

const smColsMap: { [key: number]: string } = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
};

const lgColsMap: { [key: number]: string } = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
};

interface GridClassProps {
    cols?: number;
    smCols?: number;
    lgCols?: number;
}

export function getGridClasses({ cols = 1, smCols, lgCols }: GridClassProps): string[] {
    const effectiveSmCols = smCols ?? cols;
    const effectiveLgCols = lgCols ?? cols;

    const classList = [
        'grid',
        'gap-8',
        'items-center',
        colsMap[cols],
        smColsMap[effectiveSmCols],
        lgColsMap[effectiveLgCols],
    ].filter(Boolean);

    return classList;
}
