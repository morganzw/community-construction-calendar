// Returns pairs of events that overlap in time — used to flag scheduling conflicts
export function findConflicts(events) {
  const conflicts = []
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const a = events[i]
      const b = events[j]
      if (a.start < b.end && b.start < a.end) {
        conflicts.push([a, b])
      }
    }
  }
  return conflicts
}

// Returns a Set of event IDs that participate in any conflict
export function conflictingIds(events) {
  const ids = new Set()
  findConflicts(events).forEach(([a, b]) => {
    ids.add(a.id)
    ids.add(b.id)
  })
  return ids
}
