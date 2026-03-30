

import jwt from 'jsonwebtoken'

// ─────────────────────────────────────────
// PROTECT MIDDLEWARE
// runs before every protected route
// ─────────────────────────────────────────
const protect = (req, res, next) => {
  try {

    // Step 1 — Get token from request header
    // Frontend sends:  Authorization: Bearer eyJhbGci...
    const authHeader = req.headers.authorization

    // Step 2 — Check if header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, not authorized' })
    }

    // Step 3 — Extract token from "Bearer eyJhbGci..."
    //          split(' ') = ['Bearer', 'eyJhbGci...']
    //          [1]        = 'eyJhbGci...'
    const token = authHeader.split(' ')[1]

    // Step 4 — Verify token using JWT_SECRET
    // if token is valid   → returns decoded payload
    // if token is invalid → throws error → goes to catch
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Step 5 — Attach userId to req object
    // now every route handler can use req.userId
    req.userId = decoded.userId

    // Step 6 — Call next() to move to route handler
    next()

  } catch (error) {
    console.error('Auth middleware error:', error.message)
    res.status(401).json({ message: 'Token invalid or expired' })
  }
}

export default protect
  /*

---

## How It Works Step by Step
```
Request hits protected route
        ↓
protect middleware runs first
        ↓
reads Authorization header
        ↓
extracts token after "Bearer "
        ↓
jwt.verify() checks token
        ↓
valid?  → puts userId on req → calls next()
invalid? → sends 401 → route handler never runs  */ 