function getTableData(content) {
    const regExTable = /<table[^>]*?>(.*?)<\/table>/s;
    const tableResult = regExTable.exec(content);
    if (!tableResult || !tableResult[1]) {
        throw new Error('we can\'t find our table');
    }
    return tableResult[1];
}

function getTableLines(tableBody) {
    const regExLines = /<tr[^>]*?>(.*?)<\/tr>/sg;
    const lines = [];
    let lineResults;
    do {
        lineResults = regExLines.exec(tableBody);
        if (!!lineResults && !!lineResults[1]) {
            lines.push(lineResults[1]);
        }
    } while (!!lineResults);
    if (!lines.length) {
        throw new Error('we can\'t find the table body');
    }
    return lines;
}

function getTableColums(lines) {
    const regExColumn = /<t[dh][^>]*?>(.*?)<\/t[dh]>/sg;
    let columnResults;
    const colums = [];
    for (const line of lines) {
        const column = [];
        do {
            columnResults = regExColumn.exec(line);
            if (!!columnResults && !!columnResults[1]) {
                column.push(columnResults[1].trim());
            }
        } while(!!columnResults);
        if (!!column.length) {
            colums.push(column);
        }
    }
    return colums;
}

function extract(content) {
    const tableData = getTableData(content);
    const tableLines = getTableLines(tableData);
    return getTableColums(tableLines);
}

module.exports = extract;