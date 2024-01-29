import * as XLSX from 'xlsx';

export const downloadData = (data, filename) => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, workSheet, "Sheet1");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
}
