const CONN_KEY = 'jtna_connection_log'
const AUDIT_KEY = 'jtna_audit_log'

function safeParse(v) {
  try {
    const parsed = JSON.parse(v)
    return parsed || []
  } catch (e) {
    return []
  }
}

// Seed the logs with some static demo entries when the module loads in a browser
function seedDefaultLogs() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return

    const curConn = safeParse(localStorage.getItem(CONN_KEY))
    const curAudit = safeParse(localStorage.getItem(AUDIT_KEY))

    if (!curConn || curConn.length === 0) {
      const now = Date.now()
      const defaults = [
        { ts: now - 5 * 60 * 1000, event: 'Connected to gateway wg2 as user admin' },
        { ts: now - 4 * 60 * 1000, event: 'Authorization check passed for user admin' },
        { ts: now - 3 * 60 * 1000, event: 'Started session (client v1.2.3)' },
        { ts: now - 2 * 60 * 1000, event: 'Connection heartbeat received' },
        { ts: now - 1 * 60 * 1000, event: 'Disconnected: remote host closed the connection' },
        { ts: now, event: 'Reconnected to gateway wg2' },
      ]
      localStorage.setItem(CONN_KEY, JSON.stringify(defaults))
    }

    if (!curAudit || curAudit.length === 0) {
      const now = Date.now()
      const defaults = [
        { ts: now - 24 * 60 * 60 * 1000, entry: 'User admin created the instance "wg2"' },
        { ts: now - 12 * 60 * 60 * 1000, entry: 'User admin changed settings: gateway -> wg2' },
        { ts: now - 60 * 60 * 1000, entry: 'User alice was granted access to resource db-prod' },
        { ts: now - 30 * 60 * 1000, entry: 'System rotated keys for service-account:svc-01' },
        { ts: now - 5 * 60 * 1000, entry: 'User admin logged in from 192.0.2.14' },
      ]
      localStorage.setItem(AUDIT_KEY, JSON.stringify(defaults))
    }
  } catch (e) {
    // ignore any errors (e.g., storage disabled)
    console.warn('seedDefaultLogs skipped:', e && e.message)
  }
}

seedDefaultLogs()

export function appendConnectionEvent(event) {
  const list = safeParse(localStorage.getItem(CONN_KEY))
  list.unshift({ ts: Date.now(), event })
  // keep last 100
  localStorage.setItem(CONN_KEY, JSON.stringify(list.slice(0, 500)))
}

export function getConnectionEvents(limit = 20) {
  const list = safeParse(localStorage.getItem(CONN_KEY))
  return list.slice(0, limit)
}

export function clearConnectionEvents() {
  localStorage.removeItem(CONN_KEY)
}

export function appendAuditEvent(entry) {
  const list = safeParse(localStorage.getItem(AUDIT_KEY))
  // append-only
  list.unshift({ ts: Date.now(), entry })
  localStorage.setItem(AUDIT_KEY, JSON.stringify(list.slice(0, 1000)))
}

export function getAuditEvents(limit = 100) {
  const list = safeParse(localStorage.getItem(AUDIT_KEY))
  return list.slice(0, limit)
}

export function clearAuditEvents() {
  // intentionally do not clear audit events to honor append-only security constraint
  // This function is present for developer/testing but will not delete in production.
  console.warn('Audit log clear called - operation is disabled for security reasons')
}
