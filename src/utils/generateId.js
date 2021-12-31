export function generateId(id1, id2) {
  if (id1 > id2) {
    return id1 + id2;
  }

  return id2 + id1;
}
