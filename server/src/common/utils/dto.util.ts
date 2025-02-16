export function dto(items: any[], excludes: string[]) {
  return items.map((item) => {
    for (const exclude of excludes) {
      delete item[exclude];
    }

    return item;
  });
}
