export function apiError(error: unknown, status = 400) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  return Response.json({ error: message }, { status });
}

export function orderBySort() {
  return [{ sortOrder: "asc" as const }, { createdAt: "desc" as const }];
}
