export async function GetCsvFromXlsx(path: string): Promise<any> {
  const xlsx = await import("xlsx");
  const xslxPattern = /.+\.(xlsx)$/;
  if (!path.match(xslxPattern)) {
    throw new Error(`path does not match ${path}`);
  }
  const workBook = xlsx.readFile(path);
  return xlsx.write(workBook, {
    bookType: "csv",
    WTF: true, // throw on unexpected features,
    type: "string",
  });
}

export async function EnsureFilePath(path: string): Promise<string> {
  const fs = await import("fs-extra");
  const pathExists = await fs.pathExists(path);
  if (!pathExists) {
    throw new Error(`Could not find file ${path}`);
  }
  return path;
}
